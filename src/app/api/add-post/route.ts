import ApiResponse from "@/lib/ApiResponse";
import prisma from "@/lib/PrismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "@/lib/RedisClient";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

type PostType =
    | "LOCAL_UPDATE"
    | "PLACE_RECOMMENDATION"
    | "HELP"
    | "EVENT_ANNOUNCEMENT";

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

        const formData = await request.formData();

        const content = formData.get("content") as string;
        const type = formData.get("type") as PostType;
        let location = formData.get("location") as string;
        const images = formData.getAll("images") as File[];

        if (!content || !type || !Array.isArray(images)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid payload"),
                { status: 400 }
            );
        }

        if(!location) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            })
            location = user?.location || "";
        }
        const contentWithoutSpaces = content.replace(/\s/g, "").length;
        if (contentWithoutSpaces > 280) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Content must be less than 280 characters"
                ),
                { status: 400 }
            );
        }
        const [latitudeStr, longitudeStr] = location.split(",");
        const latitude = parseFloat(latitudeStr);
        const longitude = parseFloat(longitudeStr);

        if (isNaN(latitude) || isNaN(longitude)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid location"),
                { status: 400 }
            );
        }

        if (images.length > 5) {
            return NextResponse.json(
                new ApiResponse(false, "You can upload a maximum of 5 images"),
                { status: 400 }
            );
        }

        const media = [];
        if (images.length > 0) {
            for (const file of images) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64 = `data:${file.type};base64,${buffer.toString(
                    "base64"
                )}`;

                const uploadRes = await cloudinary.uploader.upload(base64, {
                    folder: "posts", // optional
                    allowed_formats: [
                        "jpg",
                        "png",
                        "jpeg",
                        "mp4",
                        "mov",
                        "webm",
                    ],
                });

                media.push(uploadRes.secure_url);
            }
        }

        const post = await prisma.post.create({
            data: {
                content,
                type,
                location,
                media,
                userId,
            },
        });

        await redisClient.geoadd("posts", longitude, latitude, post.id);

        return NextResponse.json(
            new ApiResponse(true, "Post created successfully", post),
            { status: 200 }
        );
    } catch (error) {
        console.error("Post creation error:", error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
