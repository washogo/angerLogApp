import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await checkAuth();
    const userId = user.id;
    const { category, content } = body;

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
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, category,
      content,
    } = body;

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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id
    } = body;

    const record = await prisma.workContent.delete({
      where: { id },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const user = await checkAuth();
  const userId = user.id;
  try {
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