
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';
import {serverAuth} from '@/lib/serverAuth';

export async function GET() {
  try {
    await serverAuth();

    // 方法1：使用 findMany + 随机skip (适合中小型数据集)
    const movieCount = await prisma.movie.count();
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
        // 其他需要的字段...
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