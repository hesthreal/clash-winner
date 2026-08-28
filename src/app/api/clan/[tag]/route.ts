import { NextRequest, NextResponse } from "next/server";
import { analyzeClan } from "@/services/clan.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const resolvedParams = await params;
    const tag = decodeURIComponent(resolvedParams.tag);

    const result = await analyzeClan(tag);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.statusCode || 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /api/clan] Internal error:", error);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
