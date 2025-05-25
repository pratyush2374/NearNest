import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
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
        const userId = token.id 
        const { postId, comment } = await request.json();

        if (!postId || !comment) {
            return NextResponse.json(
                new ApiResponse(false, "Post ID and comment are required"),
                { status: 400 }
            );
        }

        await prisma.comment.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
                content: comment,
            },
        });

        return NextResponse.json(new ApiResponse(true, "Comment added"), {
            status: 200,
        });
    } catch (error) {
        console.error("Error adding comment", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
