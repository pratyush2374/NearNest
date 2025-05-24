import ApiResponse from "@/lib/ApiResponse";
import { verifyToken } from "@/lib/JWT";
import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        if (!token) {
            return NextResponse.json(
                new ApiResponse(false, "Token is required"),
                { status: 400 }
            );
        }

        const verifiedToken = verifyToken(token);

        if (!verifiedToken) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid or expired token"),
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: verifiedToken.email },
        });

        if (!user) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid or expired token"),
                { status: 400 }
            );
        }

        if (user.isVerified)
            return NextResponse.json(
                new ApiResponse(false, "Email already verified"),
                { status: 200 }
            );

        // You can use userId or email from the record depending on your schema
        await prisma.user.update({
            where: { email: user.email },
            data: { isVerified: true },
        });

        return NextResponse.json(
            new ApiResponse(true, "Email successfully verified"),
            { status: 200 }
        );
    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
