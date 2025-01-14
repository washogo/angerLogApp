import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";
import { checkAuth } from "@/api/user";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("taskId");
    if (id === null) {
      return new Response("Invalid ID", { status: 400 });
    }
    const record = await prisma.workContent.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching workContent:", error);
    return NextResponse.json({ error: "Failed to fetch workContent" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    const userId = user.id;
    const body = await request.json();
    const { category,
      content,
    } = body;
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