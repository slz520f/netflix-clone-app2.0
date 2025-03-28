import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';

/**
 * 映画一覧取得API
 * GET /api/movies
 * 戻り値: 映画オブジェクトの配列
 */
export async function GET() {
    try {
        // 認証チェック（認証が必要な場合）
        await serverAuth();
        
        // データベースから全映画情報を取得
        const movies = await prismadb.movie.findMany();
        
        // 成功レスポンス
        return NextResponse.json(movies);
        
    } catch(error) {
        // エラーログ出力
        console.error('[映画一覧取得エラー]', error);
        
        // エラーレスポンス
        return NextResponse.json(
            { error: "サーバー内部エラーが発生しました" },
            { status: 500 }
        );
    }
}

/**
 * 新規映画登録API
 * POST /api/movies
 * 必要なデータ: 映画オブジェクト（title, descriptionなど）
 * 管理者権限が必要
 */
export async function POST(request: Request) {
    try {
        // ユーザー認証と権限チェック
        const { currentUser } = await serverAuth();
        if (!currentUser) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 }
            );
        }

        // リクエストボディから映画データを取得
        const body = await request.json();
        
        // データベースに新規映画を登録
        const movie = await prismadb.movie.create({ 
            data: body 
        });
        
        // 登録成功レスポンス
        return NextResponse.json(movie);
        
    } catch(error) {
        // エラーログ出力
        console.error('[映画登録エラー]', error);
        
        // エラーレスポンス
        return NextResponse.json(
            { error: "サーバー内部エラーが発生しました" },
            { status: 500 }
        );
    }
}