import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';
import { without } from "lodash";

/**
 * お気に入り映画の追加
 * POST /api/favorites
 */
export async function POST(req: Request) {
  try {
    // 1. 認証チェック
    const { currentUser } = await serverAuth();
    
    // 2. リクエストデータ検証
    const { movieId } = await req.json();
    if (!movieId) {
      return NextResponse.json(
        { error: "映画IDが指定されていません" },
        { status: 400 }
      );
    }

    // 3. 映画存在確認
    const movieExists = await prisma.movie.findUnique({
      where: { id: movieId }
    });
    if (!movieExists) {
      return NextResponse.json(
        { error: "指定された映画が見つかりません" },
        { status: 404 }
      );
    }

    // 4. お気に入り追加
    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email || "" },
      data: {
        favoriteIds: {
          push: movieId
        }
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("お気に入り追加エラー:", error);
    return NextResponse.json(
      { error: "サーバー内部エラー" },
      { status: 500 }
    );
  }
}

/**
 * お気に入り映画の削除
 * DELETE /api/favorites
 */
export async function DELETE(req: Request) {
  try {
    // 1. 認証チェック
    const { currentUser } = await serverAuth();
    
    // 2. リクエストデータ検証
    const { movieId } = await req.json();
    if (!movieId) {
      return NextResponse.json(
        { error: "映画IDが指定されていません" },
        { status: 400 }
      );
    }

    // 3. 映画存在確認
    const movieExists = await prisma.movie.findUnique({
      where: { id: movieId }
    });
    if (!movieExists) {
      return NextResponse.json(
        { error: "指定された映画が見つかりません" },
        { status: 404 }
      );
    }

    // 4. お気に入りから削除
    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email || "" },
      data: {
        favoriteIds: updatedFavoriteIds
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("お気に入り削除エラー:", error);
    return NextResponse.json(
      { error: "サーバー内部エラー" },
      { status: 500 }
    );
  }
}