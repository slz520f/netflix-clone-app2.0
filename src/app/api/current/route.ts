// import serverAuth from "@/app/lib/serverAuth";
// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server"; // 改为 NextResponse

// export async function GET(req: NextApiRequest) {
//   try {
//     const { currentUser } = await serverAuth(req);
//     return NextResponse.json(currentUser, { status: 200 }); // 使用 NextResponse.json 返回数据
//   } catch (error) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 }); // 使用 NextResponse.json 返回错误
//   }
// }

// src/app/api/current/route.ts
import serverAuth from "@/app/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}