import { prisma } from "../../../utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, level, workTypeId, occurredDate, situation, feeling } = body;

    const record = await prisma.angerRecord.create({
      data: {
        userId,
        level,
        workTypeId,
        occurredDate: new Date(occurredDate),
        situation,
        feeling,
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
    const { id, level, workTypeId, occurredDate, situation, feeling } = body;

    const record = await prisma.angerRecord.update({
      where: { id },
      data: {
        level,
        workTypeId,
        occurredDate: new Date(occurredDate),
        situation,
        feeling,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
