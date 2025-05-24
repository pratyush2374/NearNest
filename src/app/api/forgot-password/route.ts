import sendEmail from "@/lib/Emailer";
import { generateToken } from "@/lib/JWT";
import { NextRequest, NextResponse } from "next/server";

import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || typeof email !== "string" || !emailRegex.test(email)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid email address"),
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "If the email is registered, you will receive a reset link"
                ),
                { status: 200 }
            );
        }

        // Generate a reset token
        const tokenData = { email: user.email };
        const token = generateToken(tokenData, "1h");

        // Create a password reset link
        const resetLink = `${
            process.env.CLIENT_URL
        }/reset-password?token=${encodeURIComponent(token)}`;

        const emailBody = `
            <p>Hi ${user.fullName},</p>
            <p>We received a request to reset your password for your NearNest account.</p>

            <p>
            Click the link below to reset your password:
            <br />
            <a href="${resetLink}">${resetLink}</a>
            </p>

            <p>If you did not request this, you can safely ignore this email.</p>
            <p>Thanks,<br />The NearNest Team</p>
        `;

        await sendEmail(user.email, "Reset your NearNest password", emailBody);

        return NextResponse.json(
            new ApiResponse(true, "Password reset link sent successfully"),
            { status: 200 }
        );
    } catch (error) {
        // Log the error for debugging
        console.error("Error in password reset flow:", error);

        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
};
