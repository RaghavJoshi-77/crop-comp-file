import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../../generated/prisma";

//this is for video upload ka title and all 
const prisma = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


interface CloudinaryUploadResult {
    public_id: string ;
    bytes: number;
    duration?: number
    [key: string] : any 
}

export async function POST (request:NextRequest ){
    const {userId} = await auth() 

    if (!userId) {
        return NextResponse.json({error:"user is unauthorised "}, {status:401})
    }
     

    try {
        const formData = await request.formData() 
        const file = formData.get('file') as File | null
        if (!file) {
            return NextResponse.json({error:"file not found"}, {status:401})
        }

        const bytes = await file.arrayBuffer()
        //we cant upload arraybuffer directly we have to upload buffer         
        const buffer = Buffer.from(bytes)
        //grabbing the title and all the stuff 
        const title = formData.get("title") as string 
        const description = formData.get("description") as string 
        const orignalSize = formData.get("orignalSize") as string

        const result = await new Promise <CloudinaryUploadResult>(
            (resolve , reject )=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {resource_type:"video",folder:"video-uploads", transformation:[{quality:"auto", fetch_format:"mp4"}]},
                    (error,result)=>{
                        if (error) reject (error)
                        else resolve(result as CloudinaryUploadResult)   
                    }
                )
                //ending the buffer 
                uploadStream.end(buffer)
                
            }
        )
        //returninh stuff 
        const video = await prisma.video.create({
            data:{
                title,
                description,
                publicId:result.public_id,
                originalSize:orignalSize,
                compressedSize:String(result.bytes),
                duration:result.duration || 0
            }
        })
        return NextResponse.json(video)
        

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"upload video failed"},{status:500})
    }
    finally{
        await prisma.$disconnect()
    }

}
