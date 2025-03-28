
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';// Prisma クライアント
import {serverAuth} from '@/lib/serverAuth';// 認証関数

export async function GET() {
  try {
    await serverAuth();// ユーザー認証

    // 映画の総数を取得
    const movieCount = await prisma.movie.count();
 // ランダムな映画を取得
    const skip = Math.floor(Math.random() * movieCount);
    const [randomMovie] = await prisma.movie.findMany({
      take: 1,
      skip,
      select: {
        id: true,
        title: true,
        description: true,
        videoUrl: true,
        thumbnailUrl: true,
       
      }
    });

    if (!randomMovie) {
      return NextResponse.json(
        { error: "No movies found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(randomMovie);

  } catch (error) {
    console.error('[RANDOM_MOVIE_ERROR]', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}