import { connectDB } from "@/app/lib/mongo";
import { Fabric } from "@/app/lib/models/fabrics";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/fabrics/:id
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connectDB();
  
    const fabric = await Fabric.findById(params.id);
    if (!fabric) return new Response("Not found", { status: 404 });
  
    return Response.json(fabric);
  }

// PUT /api/fabrics/:id
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  await connectDB();

  const body = await request.json();
  const updatedFabric = await Fabric.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  if (!updatedFabric) return new Response("Not found", { status: 404 });
  return Response.json(updatedFabric);
}

// DELETE /api/fabrics/:id
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  await connectDB();

  const deleted = await Fabric.findByIdAndDelete(params.id);
  if (!deleted) return new Response("Not found", { status: 404 });

  return new Response("Deleted", { status: 200 });
}
