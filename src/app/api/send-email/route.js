import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Direct email requests are disabled. Submit a booking instead." },
    { status: 410 }
  );
}
