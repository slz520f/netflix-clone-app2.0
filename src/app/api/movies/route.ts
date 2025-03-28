import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import serverAuth from '@/app/lib/serverAuth';


export async function GET() {
    try{
        await serverAuth();
        const movies = await prisma.movie.findMany();
        return NextResponse.json(movies);
    }catch(error){
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
    }
}