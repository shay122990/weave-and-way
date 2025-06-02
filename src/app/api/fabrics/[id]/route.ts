import { connectDB } from "@/app/lib/mongo";
import { Fabric } from "@/app/lib/models/fabrics";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// GET
export async function GET(req: NextRequest, 
  // @ts-expect-error - Next.js infers `context`, do not annotate
  context
) {
  const { id } = context.params;

  await connectDB();
  const fabric = await Fabric.findById(id);
  if (!fabric) return new Response("Not found", { status: 404 });

  return Response.json(fabric);
}

// PUT
export async function PUT(req: NextRequest, 
  // @ts-expect-error - Next.js infers `context`, do not annotate
  context
) {
  const { id } = context.params;

  await connectDB();
  const body = await req.json();

  const updated = await Fabric.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return new Response("Not found", { status: 404 });

  return Response.json(updated);
}

// DELETE
export async function DELETE(req: NextRequest, 
  // @ts-expect-error - Next.js infers `context`, do not annotate
  context
) {
  const { id } = context.params;

  await connectDB();
  const deleted = await Fabric.findByIdAndDelete(id);
  if (!deleted) return new Response("Not found", { status: 404 });

  return new Response("Deleted", { status: 200 });
}
