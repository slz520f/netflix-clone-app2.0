// import { NextResponse } from "next/server";
// import prismadb from "../../../lib/prismadb";
// import { hash } from "bcrypt";

// export async function POST(req: Request) {
//   try {
//     const { email, name, password } = await req.json();

//     // 检查是否提供所有必需的信息
//     if (!email || !name || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     // 检查用户是否已经存在
//     const existingUser = await prismadb.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: "Email already in use" }, { status: 400 });
//     }

//     // 创建新用户
//     const hashedPassword = await hash(password, 10);
//     const user = await prismadb.user.create({
//       data: {
//         email,
//         name,
//         hashedPassword,
//       },
//     });

//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 检查用户是否已经存在
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // 对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建用户
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // 返回成功和用户信息
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
