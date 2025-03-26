import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb"; // パスを修正
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const body = await req.json(); // App Routerでは req.body ではなく、await req.json() を使う
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingUser = await prismadb.user.findUnique({
            where: { email }as Prisma.UserWhereUniqueInput
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: "",
                emailVerified: new Date()
            }
        });

        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
