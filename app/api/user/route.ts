import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/auth";


export async function GET() {
  const user = await checkAuth();
  const id = user.id;
  try {
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const user = await checkAuth();
    const id = user.id;
    const { name, email, goal, } = body;

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