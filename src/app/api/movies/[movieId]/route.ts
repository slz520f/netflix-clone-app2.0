// import { NextResponse } from 'next/server';
// import prisma from '@/app/lib/prismadb';

// export async function GET(
//   request: Request,
//   { params }: { params: { movieId: string } }
// ) {
//   try {
//     // 移除 serverAuth() 或确保它不会阻止请求
//     // await serverAuth();

//     if (!params.movieId) {
//       return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
//     }

//     const movie = await prisma.movie.findUnique({
//       where: { id: params.movieId },
//     });

//     if (!movie) {
//       return NextResponse.json({ error: "Movie not found" }, { status: 404 });
//     }

//     return NextResponse.json(movie);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// app/api/movies/[movieId]/route.ts
// app/api/movies/[movieId]/route.ts
// src/app/api/movies/[movieId]/route.ts
// src/app/api/movies/[movieId]/route.ts
// src/app/api/movies/[movieId]/route.ts
// src/app/api/movies/[movieId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';

export async function GET(request: NextRequest) {
  try {
    await serverAuth();

    // 从请求 URL 中提取 movieId
    const movieId = request.nextUrl.pathname.split('/').pop();

    if (!movieId) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      );
    }

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(movie);
  } catch (error: unknown) {
    console.error(
      '[MOVIE_GET]',
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await serverAuth();
    if (!auth?.currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const movieId = request.nextUrl.pathname.split('/').pop();

    if (!movieId) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      );
    }

    const movie = await prismadb.movie.delete({
      where: { id: movieId },
    });

    return NextResponse.json(movie);
  } catch (error: unknown) {
    console.error(
      '[MOVIE_DELETE]',
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
