import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const angerId = searchParams.get("angerId");
  if (angerId === null) {
    return new Response("Invalid ID", { status: 400 });
  }
  try {
    const record = await prisma.angerRecord.findUnique({
      where: { id: parseInt(angerId) },
    });
    console.log("record:", record);

    if (!record) {
      console.log("angerId:", angerId);
      return new Response("Not Found", { status: 404 });
    }
    console.log(NextResponse.json(record))
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching AngerRecord:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}