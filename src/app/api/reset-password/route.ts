import { NextRequest, NextResponse } from "next/server";
import ApiResponse from "@/lib/ApiResponse";
import { verifyToken } from "@/lib/JWT";
import prisma from "@/lib/PrismaClient";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                new ApiResponse(false, "Token and password are required"),
                { status: 400 }
            );
        }

        const payload = verifyToken(token);

        if (!payload || !payload.email) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid or expired url"),
                { status: 401 }
            );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await prisma.user.update({
            where: { email: payload.email },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            new ApiResponse(true, "Password reset successful"),
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
