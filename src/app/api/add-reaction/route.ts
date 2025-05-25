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
        const { postId, type } = await request.json(); // Changed from reactionType to type

        if (!postId || !type || !["LIKE", "DISLIKE"].includes(type)) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Post ID and reaction type are required"
                ),
                { status: 400 }
            );
        }

        // Check if user already has a reaction on this post
        const existingReaction = await prisma.reaction.findFirst({
            where: {
                userId,
                postId,
            },
        });

        let result;
        let message;

        if (existingReaction) {
            if (existingReaction.type === type) {
                // User is toggling off the same reaction - remove it
                await prisma.reaction.delete({
                    where: {
                        id: existingReaction.id,
                    },
                });
                result = null;
                message = `${type.toLowerCase()} removed`;
            } else {
                // User is switching reaction type - update it
                result = await prisma.reaction.update({
                    where: {
                        id: existingReaction.id,
                    },
                    data: {
                        type: type as ReactionType,
                    },
                });
                message = `Reaction updated to ${type.toLowerCase()}`;
            }
        } else {
            // User is adding a new reaction
            result = await prisma.reaction.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                    post: {
                        connect: { id: postId },
                    },
                    type: type as ReactionType,
                },
            });
            message = `${type.toLowerCase()} added`;
        }

        return NextResponse.json(new ApiResponse(true, message, result), {
            status: 200,
        });
    } catch (error) {
        console.error("Error handling reaction", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
