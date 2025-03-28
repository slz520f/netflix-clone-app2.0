import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';

/**
 * 映画詳細情報取得API
 * GET /api/movies/[movieId]
 */
export async function GET(request: NextRequest) {
  try {
    // ユーザー認証を実行
    await serverAuth();

    // リクエストURLからmovieIdを抽出（最後のパスセグメントを取得）
    const movieId = request.nextUrl.pathname.split('/').pop();

    // movieIdのバリデーション
    if (!movieId) {
      return NextResponse.json(
        { error: '映画IDが指定されていません' }, // Movie ID is required
        { status: 400 }
      );
    }

    // データベースから映画情報を取得
    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    // 映画が存在しない場合の処理
    if (!movie) {
      return NextResponse.json(
        { error: '指定された映画が見つかりません' }, // Movie not found
        { status: 404 }
      );
    }

    // 成功レスポンス
    return NextResponse.json(movie);
  } catch (error: unknown) {
    // エラーログ出力（Errorオブジェクトかどうかで処理を分岐）
    console.error(
      '[MOVIE_GETエラー]', // [MOVIE_GET]
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    // サーバーエラーレスポンス
    return NextResponse.json(
      { error: 'サーバー内部エラーが発生しました' }, // Internal Server Error
      { status: 500 }
    );
  }
}

/**
 * 映画削除API
 * DELETE /api/movies/[movieId]
 */
export async function DELETE(request: NextRequest) {
  try {
    // ユーザー認証を実行
    const auth = await serverAuth();
    
    // 認証チェック
    if (!auth?.currentUser) {
      return NextResponse.json(
        { error: '認証が必要です' }, // Unauthorized
        { status: 401 }
      );
    }

    // リクエストURLからmovieIdを抽出
    const movieId = request.nextUrl.pathname.split('/').pop();

    // movieIdのバリデーション
    if (!movieId) {
      return NextResponse.json(
        { error: '映画IDが指定されていません' }, // Movie ID is required
        { status: 400 }
      );
    }

    // データベースから映画を削除
    const movie = await prismadb.movie.delete({
      where: { id: movieId },
    });

    // 成功レスポンス
    return NextResponse.json(movie);
  } catch (error: unknown) {
    // エラーログ出力
    console.error(
      '[MOVIE_DELETEエラー]', // [MOVIE_DELETE]
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    // サーバーエラーレスポンス
    return NextResponse.json(
      { error: 'サーバー内部エラーが発生しました' }, // Internal Server Error
      { status: 500 }
    );
  }
}