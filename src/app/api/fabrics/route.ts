import { connectDB } from "@/app/lib/mongo";
import { Fabric } from "@/app/lib/models/fabrics";

export async function GET() {
  await connectDB();
  const fabrics = await Fabric.find().sort({ createdAt: -1 });
  return Response.json(fabrics);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newFabric = await Fabric.create(body);
    return Response.json(newFabric, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Error creating fabric: " + error.message, { status: 500 });
    }
    return new Response("Unknown server error", { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectDB();
    await Fabric.deleteMany({});
    return new Response("All fabrics deleted successfully.", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Error deleting fabrics: " + error.message, { status: 500 });
    }
    return new Response("Unknown server error", { status: 500 });
  }
}
