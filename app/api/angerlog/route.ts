import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/user";

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
export async function GET(request: Request) {
  const user = await checkAuth();
  const userId = user.id;
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const type = searchParams.get("type");

  let startDate, endDate;
  if (type === "daily" && day) {
    startDate = `${year}-${month}-${day} 00:00:00`;
    endDate = `${year}-${month}-${day} 23:59:59`;
  } else if (type === "monthly") {
    startDate = `${year}-${month}-01 00:00:00`;
    const lastDay = new Date(Number(year), Number(month), 0).getDate();
    endDate = `${year}-${month}-${lastDay} 23:59:59`;
  } else {
    return NextResponse.json({ error: "無効な検索条件です" }, { status: 400 });
  }
  try {
    const angerLogs = await prisma.angerRecord.findMany({
      where: {
        userId,
        occurredDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        occurredDate: "asc",
      },
      include: {
        workType: true,
      },
    });
    return NextResponse.json(angerLogs);
  } catch (error) {
    console.error("Error fetching anger logs:", error);
    return NextResponse.json({ error: "Failed to fetch anger logs" }, { status: 500 });
  }
}