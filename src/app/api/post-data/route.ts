import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

        const postId = request.nextUrl.searchParams.get("postId");
        if (!postId) {
            return NextResponse.json(
                new ApiResponse(false, "Post ID is required"),
                { status: 400 }
            );
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        username: true,
                    },
                },
                reactions: true,
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
        });

        if (!post) {
            return NextResponse.json(new ApiResponse(false, "Post not found"), {
                status: 404,
            });
        }

        return NextResponse.json(
            new ApiResponse(true, "Post fetched", { ...post }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
