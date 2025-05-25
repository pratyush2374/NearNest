import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
import { ReactionType } from "@prisma/client";
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
        const userId = token.id;
        const { postId, reactionType } = await request.json();

        if (
            !postId ||
            !reactionType ||
            !["LIKE", "DISLIKE"].includes(reactionType)
        ) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Post ID and reaction type are required"
                ),
                { status: 400 }
            );
        }

        await prisma.reaction.deleteMany({
            where: {
                userId,
                postId,
            },
        });

        const reaction = await prisma.reaction.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                post: {
                    connect: { id: postId },
                },
                type: reactionType as ReactionType,
            },
        });

        return NextResponse.json(new ApiResponse(true, "Reaction added", reaction), {
            status: 200,
        });
    } catch (error) {
        console.error("Error adding reaction", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
