import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/auth";

/**
 * ユーザー情報を取得するAPI
 * @returns ユーザー情報
 */
export async function GET() {
  // ユーザ認証
  const user = await checkAuth();
  const id = user.id;
  try {
    // ユーザ情報取得
    const record = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

/**
 * ユーザー情報を更新するAPI
 * @param request リクエスト
 * @returns ユーザー情報
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // ユーザ認証
    const user = await checkAuth();
    const id = user.id;
    const { name, email, goal, } = body;
    // ユーザー情報更新
    const record = await prisma.user.update({
      where: { id },
      data: {
        email,
        goal,
        name,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}