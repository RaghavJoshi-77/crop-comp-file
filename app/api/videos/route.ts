import {NextRequest, NextResponse} from "next/server"

import { PrismaClient } from "../../generated/prisma";

//to connect with prisma 

const prisma = new PrismaClient()

export async function GET(req:NextRequest){
    try {
        const videos = await prisma.video.findMany({
            orderBy:{createdAt:"desc"}
        })
        return NextResponse.json(videos)
    } 
    catch (error) {
        return NextResponse.json({error:"errror while fetching videos"})
    }
    //best practise is to disconnect prisma 
    finally {
        await prisma.$disconnect()
    }

}