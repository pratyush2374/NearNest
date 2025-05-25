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
        const userId = token.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                posts: {
                    include: {
                        comments: true,
                        reactions: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(new ApiResponse(false, "User not found"), {
                status: 404,
            });
        }

        return NextResponse.json(new ApiResponse(true, "User fetched", user), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
