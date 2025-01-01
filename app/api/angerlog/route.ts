import { prisma } from "../../../utils/prisma";
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

  let startDate: Date;
  let endDate: Date;

  if (type === "daily") {
    startDate = new Date(`${year}-${month}-${day}T00:00:00`);
    endDate = new Date(`${year}-${month}-${day}T23:59:59`);
  } else if (type === "monthly") {
    startDate = new Date(`${year}-${month}-01T00:00:00`);
    endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));
  } else {
    return NextResponse.json({ error: "無効な検索条件です" }, { status: 400 });
  }
  try {
    console.log(startDate)
    console.log(endDate)
    const angerLogs = await prisma.angerRecord.findMany({
      where: {
        userId,
        occurredDate: {
          gte: startDate,
          lt: endDate,
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