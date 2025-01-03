import prisma from "../../../../utils/prisma";
import { NextResponse } from "next/server";

type PageProps = {
  params: Promise<{
    angerId: string;
  }>;
};

export async function GET(request: Request, { params }: PageProps) {
  try {
    const angerId = parseInt((await params).angerId);

    if (isNaN(angerId)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const record = await prisma.angerRecord.findUnique({
      where: { id: angerId },
    });
    console.error("record:", record);

    if (!record) {
      console.error("angerId:", angerId);
      return new Response("Not Found", { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching AngerRecord:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}