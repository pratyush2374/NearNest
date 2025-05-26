import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
import redisClient from "@/lib/RedisClient";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token || !token.id) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, please login"),
                {
                    status: 401,
                }
            );
        }
        const { location } = await request.json();
        if (!location) {
            return NextResponse.json(
                new ApiResponse(false, "Location is required"),
                { status: 400 }
            );
        }

        const userId = token.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return NextResponse.json(new ApiResponse(false, "User not found"), {
                status: 404,
            });
        }

        if (
            user.lastLocationUpdatedAt &&
            Date.now() - user.lastLocationUpdatedAt.getTime() > 60 * 60 * 1000
        ) {
            // If the user has not updated their location in the last hour, update their location
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    location,
                    lastLocationUpdatedAt: new Date(),
                },
            });
        }
        const [lat, lng] = location.split(",");
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const locationData = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        const districtState = locationData.data.address.state_district
            ? `${locationData.data.address.state_district}, ${locationData.data.address.state}`
            : `${locationData.data.address.state}`;
        console.log(districtState);

        const posts = await redisClient.geosearch(
            "posts",
            "FROMLONLAT",
            longitude,
            latitude,
            "BYRADIUS",
            100,
            "km",
            "WITHCOORD"
        );
        console.log(posts);
        if (posts.length === 0) {
            return NextResponse.json(
                new ApiResponse(true, "There are no posts near you", {
                    location,
                    districtState,
                    posts,
                }),
                {
                    status: 200,
                }
            );
        }
        const postIds: string[] = [];
        posts.map((post: any) => postIds.push(post[0]));

        const postData = await prisma.post.findMany({
            where: {
                id: {
                    in: postIds,
                },
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        username: true,
                    },
                },
                reactions: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                username: true,
                            },
                        },
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                username: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "Posts fetched successfully", {
                location,
                districtState,
                posts: postData,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching posts", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
