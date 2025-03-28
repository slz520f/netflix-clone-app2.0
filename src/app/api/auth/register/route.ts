import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import bcrypt from "bcryptjs";

/**
 * ユーザー登録API
 * POST /api/register
 * 必要なフィールド: email, name, password
 */
export async function POST(req: Request) {
  try {
    // 1. リクエストデータの取得とバリデーション
    const { email, name, password } = await req.json();
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "必須フィールドが不足しています" },
        { status: 400 }
      );
    }

    // 2. メールアドレスの重複チェック
    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に使用されています" },
        { status: 409 }
      );
    }

    // 3. パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12); // ソルトラウンド12

    // 4. ユーザー作成
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "", // デフォルト画像（後で更新可能）
        emailVerified: new Date(), // 即時認証済みとして扱う
      },
    });

    // 5. 成功レスポンス
    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error("ユーザー登録エラー:", error);
    return NextResponse.json(
      { error: "サーバー内部エラーが発生しました" },
      { status: 500 }
    );
  }
}