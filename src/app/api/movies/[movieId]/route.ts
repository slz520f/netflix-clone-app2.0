import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    // 移除 serverAuth() 或确保它不会阻止请求
    // await serverAuth();

    if (!params.movieId) {
      return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: params.movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}