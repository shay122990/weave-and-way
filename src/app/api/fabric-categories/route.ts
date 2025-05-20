import { connectDB } from "@/app/lib/mongo";
import { Fabric } from "@/app/lib/models/fabrics";

export async function GET() {
  await connectDB();
  const categories = await Fabric.distinct("category");
  return Response.json(categories);
}
