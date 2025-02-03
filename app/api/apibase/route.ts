import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersData = headers();
  const protocol = (await headersData).get("x-forwarded-proto") || "http";
  const host = (await headersData).get("host");
  // 絶対パス
  const baseUrl = `${protocol}://${host}`;
  return NextResponse.json({ baseUrl });
}
