// import { NextResponse } from 'next/server';
// import prisma from '../../lib/prismadb';
// import {serverAuth} from '@/app/lib/serverAuth';


// export async function GET() {
//     try{
//         await serverAuth();
//         const movies = await prisma.movie.findMany();
//         return NextResponse.json(movies);
//     }catch(error){
//         console.log(error)
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//           );
//     }
// }
// src/app/api/movies/route.ts
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';

export async function GET() {
    try {
        await serverAuth();
        const movies = await prismadb.movie.findMany();
        return NextResponse.json(movies);
    } catch(error) {
        console.error('[MOVIES_GET]', error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        if (!currentUser) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const movie = await prismadb.movie.create({ data: body });
        
        return NextResponse.json(movie);
    } catch(error) {
        console.error('[MOVIES_POST]', error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}