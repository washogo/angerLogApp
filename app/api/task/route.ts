import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/auth";

/**
 * 作業内容のデータを登録API
 * @param request リクエスト
 * @returns 作業内容データ
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // ユーザ認証
    const user = await checkAuth();
    const userId = user.id;
    const { category, content } = body;
    // 作業内容データ登録
    const record = await prisma.workContent.create({
      data: {
        userId,
        category,
        content,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
/**
 * 作業内容のデータを更新するAPI
 * @param request リクエスト
 * @returns 作業内容データ
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, category,
      content,
    } = body;
    // 作業内容データ更新
    const record = await prisma.workContent.update({
      where: { id },
      data: {
        category,
        content,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
/**
 * 作業内容のデータを削除するAPI
 * @param request リクエスト
 * @returns 作業内容データ
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id
    } = body;
    // 作業内容データ削除
    const record = await prisma.workContent.delete({
      where: { id },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * 作業内容のデータを取得するAPI
 * @returns 作業内容データ
 */
export async function GET() {
  // ユーザ認証
  const user = await checkAuth();
  const userId = user.id;
  try {
    // 作業内容データ取得
    const record = await prisma.workContent.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching workContent:", error);
    return NextResponse.json({ error: "Failed to fetch workContent" }, { status: 500 });
  }
}