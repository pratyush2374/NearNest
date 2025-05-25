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
        const userId = token.id;
        const { postId } = await request.json();

        if (!postId) {
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

        return NextResponse.json(
            new ApiResponse(true, "Reaction removed"),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error removing reaction", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
