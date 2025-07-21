import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


interface CloudinaryUploadResult {
    public_id: string ;
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
        //remember that arraybuffer is not same as buffer and it is used in browser and node uses buffer so we have to convert it      
        const buffer = Buffer.from(bytes)

        const result = await new Promise <CloudinaryUploadResult>(
            (resolve , reject )=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder:"crop-comp-uploads"},
                    (error,result)=>{
                        if (error) reject (error)
                        else resolve(result as CloudinaryUploadResult)   
                    }
                )
                //ending the buffer 
                uploadStream.end(buffer)
                
            }
        )
        //sending the public id
        return NextResponse.json({publicId:result.public_id}, {status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"upload image failed"},{status:500})
    }

}








