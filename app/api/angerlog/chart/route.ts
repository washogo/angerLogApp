import prisma from "../../../../utils/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/api/auth";
import { getDateRange } from "../../utils/dateUtils";

export async function GET(request: Request) {
  const user = await checkAuth();
  const userId = user.id;
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const type = searchParams.get("type");

  try {
    const dateRange = getDateRange(type, year, month, day);

    if ("error" in dateRange) {
      return NextResponse.json({ error: dateRange.error }, { status: 400 });
    }

    const { startDate, endDate } = dateRange;

    // 最大値を取得
    const aggregatedData = await prisma.angerRecord.groupBy({
      by: ["occurredDate"],
      _max: {
        level: true,
      },
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
    });
    // 平均値を計算
    const averageLevelData = await prisma.angerRecord.aggregate({
      _avg: {
        level: true,
      },
      where: {
        userId,
        occurredDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    const averageLevel = averageLevelData._avg.level || 0;
    // カテゴリごとのトップ5を取得
    const topCategories = await prisma.angerRecord.groupBy({
      by: ['workTypeId'],
      _max: {
        level: true,
      },
      where: {
        userId,
        occurredDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        _max: {
          level: 'desc',
        },
      },
      take: 5,
    });

    const categoryData = await Promise.all(
      topCategories.map(async (item) => {
        const workContent = await prisma.workContent.findUnique({
          where: { id: item.workTypeId },
        });
        return {
          content: workContent?.content || "不明",
          level: item._max.level,
        };
      })
    );

    return NextResponse.json({
      aggregatedData,
      averageLevel,
      categoryData,
    });
  } catch (error) {
    console.error("Error fetching anger logs:", error);
    return NextResponse.json({ error: "Failed to fetch anger logs" }, { status: 500 });
  }
}