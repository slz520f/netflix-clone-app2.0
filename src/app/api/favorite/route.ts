import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';
import {serverAuth} from '@/lib/serverAuth';
import {without} from "lodash";

export async function POST(req: Request) {
    try {
        // 认证用户
        const { currentUser } = await serverAuth();
        // 解析请求 body
        const { movieId } = await req.json();        
        // 确保 movieId 存在
        if (!movieId) {
            return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
        }
        // 检查电影是否存在
        const existingMovie = await prisma.movie.findUnique({
            where: { id: movieId },
        });
        if (!existingMovie) {
            return NextResponse.json({ error: "Invalid Movie ID" }, { status: 404 });
        }
        // 更新用户收藏列表
        const user = await prisma.user.update({
            where: { email: currentUser.email || "" },
            data: {
                favoriteIds: {
                    push: movieId,  // 确保 favoriteIds 是 string[]
                },
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error("[FAVORITE_MOVIE_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(req: Request) {
    try {
        const { currentUser } = await serverAuth();
        const { movieId } = await req.json();        
        if (!movieId) {
            return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
        }
        const existingMovie = await prisma.movie.findUnique({
            where: { id: movieId },
        });
        if (!existingMovie) {
            return NextResponse.json({ error: "Invalid Movie ID" }, { status: 404 });
        }
        const updateFavoriteIds = without(currentUser.favoriteIds,movieId);
        const updateUser = await prisma.user.update({
            where:{
                email:currentUser.email || " ",
            },
            data:{
                favoriteIds:updateFavoriteIds,
            }
        });
        return NextResponse.json(updateUser);

    } catch (error) {
        console.error("[FAVORITE_MOVIE_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

