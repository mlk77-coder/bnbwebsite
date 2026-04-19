import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get("type");
    if (!type) {
      return NextResponse.json(
        { message: "type is required" },
        { status: 400 }
      );
    }
    if (isNaN(+type))
      return NextResponse.json(
        { message: "type must be a number" },
        { status: 400 }
      );
    if (+type < 1 || +type > 5) {
      return NextResponse.json(
        { message: "type must be a number between 1 and 5" },
        { status: 400 }
      );
    }
    revalidateTag(`faq-${type}`, { expire: 0 });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
    );
  }
}
