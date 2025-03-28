
import {serverAuth} from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser, { status: 200 });
  } catch  {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}