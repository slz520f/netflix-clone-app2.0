import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import serverAuth from '@/app/lib/serverAuth';


export async function GET() {
    try{
        const {currentUser} =await serverAuth();
        const favoriteMovies = await prisma.movie.findMany({
            where:{id:{in:currentUser?.favoriteIds}}
        });
        return NextResponse.json(favoriteMovies);
    }catch(error){
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
    }
}
