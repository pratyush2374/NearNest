import ApiResponse from "@/lib/ApiResponse";
import sendEmail from "@/lib/Emailer";
import generateUniqueUsername from "@/lib/GenerateUniqueUsername";
import bcrypt from "bcryptjs"
import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/JWT";

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, password } = await request.json();

        if (!fullName || !email || !password) {
            return NextResponse.json(
                new ApiResponse(false, "All fields are required"),
                { status: 400 }
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid email address"),
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Password must be at least 8 characters"
                ),
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json(
                new ApiResponse(false, "Email already in use"),
                { status: 409 }
            );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const username = await generateUniqueUsername(email);

        await prisma.user.create({
            data: {
                fullName: fullName.trim(),
                email,
                username,
                password: hashedPassword,
            },
        });

        const tokenData = { email };
        const token = generateToken(tokenData, "1d");

        // Create a password reset link
        const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

        const emailBody = `
            <p>Hi ${fullName},</p>
            <p>Thank you for signing up with NearNest. To verify your email address, please click the link below:</p>
            <p><a href="${verifyLink}">${verifyLink}</a></p> 
            <p>Best regards,<br>NearNest Team</p>
        `

        await sendEmail(
            email,
            "Welcome to NearNest - Verify your email address",
            emailBody
        );

        return NextResponse.json(new ApiResponse(true, "User created", email), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
