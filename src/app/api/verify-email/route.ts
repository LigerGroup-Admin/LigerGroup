import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyEmailByToken } from "@/server/submissions/repository";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const destination = new URL("/verified", request.url);

  if (!token) {
    destination.searchParams.set("status", "invalid");
    return NextResponse.redirect(destination);
  }

  try {
    const record = await verifyEmailByToken(token);
    destination.searchParams.set("status", record ? "confirmed" : "invalid");
  } catch (error) {
    console.error("Failed to verify email token", error);
    destination.searchParams.set("status", "error");
  }

  return NextResponse.redirect(destination);
}
