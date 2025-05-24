import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
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
        const locationData = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        
        const districtState = locationData.data.address.state_district
            ? `${locationData.data.address.state_district}, ${locationData.data.address.state}`
            : `${locationData.data.address.state}`;
        console.log(districtState);

        return NextResponse.json(
            new ApiResponse(true, "Location updated", {
                location,
                districtState,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
