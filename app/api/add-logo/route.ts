import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    secure_url: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ error: "User is unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const videoFile = formData.get('video') as File | null;
        const imageFile = formData.get('image') as File | null;

        if (!videoFile || !imageFile) {
            return NextResponse.json({ error: "Missing files" }, { status: 400 });
        }

        const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        console.log("📤 Uploading watermark...");
        
        // Upload watermark - simple upload without folder
        const watermarkUpload = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                );
                uploadStream.end(imageBuffer);
            }
        );

        console.log("✅ Watermark uploaded:", watermarkUpload.public_id);
        console.log("📤 Uploading video...");

        // Upload video - simple upload without transformations
        const videoUpload = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type: "video",
                        format: "mp4"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                );
                uploadStream.end(videoBuffer);
            }
        );

        console.log("✅ Video uploaded:", videoUpload.public_id);

        // Manually construct the watermarked URL
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const watermarkedUrl = `https://res.cloudinary.com/${cloudName}/video/upload/l_${watermarkUpload.public_id},w_0.3,fl_relative,o_70,g_south_east,x_20,y_20/q_auto/f_mp4/${videoUpload.public_id}.mp4`;
        
        // Create download URL
        const downloadUrl = `https://res.cloudinary.com/${cloudName}/video/upload/fl_attachment:watermarked-video/l_${watermarkUpload.public_id},w_0.2,fl_relative,o_60,g_south_east,x_10,y_2/q_auto/f_mp4/${videoUpload.public_id}.mp4`;

        const response = {
            success: true,
            publicId: videoUpload.public_id,
            videoUrl: watermarkedUrl,
            downloadUrl: downloadUrl,
            watermarkUrl: watermarkUpload.secure_url,
            bytes: videoUpload.bytes
        };

        console.log("✅ SUCCESS!");
        console.log("Video URL:", watermarkedUrl);
        console.log("Download URL:", downloadUrl);
        
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error("💥 ERROR:", error);
        return NextResponse.json({ 
            error: "Upload failed", 
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}