import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { mediaId: string } }
) {
  try {
    if (!params.mediaId) {
      return new NextResponse("media id is required", { status: 400 });
    }

    const media = await prismadb.media.findUnique({
      where: {
        id: params.mediaId,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.log("[media_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { mediaId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.mediaId) {
      return new NextResponse("media id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const media = await prismadb.media.deleteMany({
      where: {
        id: params.mediaId,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.log("[media_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { mediaId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Image value is required", { status: 400 });
    }

    if (!params.mediaId) {
      return new NextResponse("Media id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const media = await prismadb.media.updateMany({
      where: {
        id: params.mediaId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.log("[MEDIA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
