import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";
import { checkAuth } from "@/api/auth";

/**
 * 作業内容のデータを単一取得するAPI
 * @param request リクエスト
 * @returns 作業内容データ
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("taskId");
    if (id === null) {
      return new Response("Invalid ID", { status: 400 });
    }
    // 作業内容データ取得
    const record = await prisma.workContent.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching workContent:", error);
    return NextResponse.json({ error: "Failed to fetch workContent" }, { status: 500 });
  }
}
/**
 * 作業内容のデータを取得するAPI
 * @param request リクエスト
 * @returns 作業内容データ
 */
export async function POST(request: Request) {
  try {
    // ユーザ認証
    const user = await checkAuth();
    const userId = user.id;
    const body = await request.json();
    const { category,
      content,
    } = body;
    // 作業内容データ取得
    const record = await prisma.workContent.findMany({
      where: {
        userId,
        category,
        content,
      },
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching workContent:", error);
    return NextResponse.json({ error: "Failed to fetch workContent" }, { status: 500 });
  }
}