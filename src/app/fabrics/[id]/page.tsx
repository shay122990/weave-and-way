export const dynamic = "force-dynamic"; 
import Link from "next/link";
import FabricZoomImage from "../components/FabricZoomImage";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

async function getFabric(id: string): Promise<Fabric> {
  const res = await fetch(`http://localhost:3000/api/fabrics/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Fabric not found");
  return res.json();
}

export default async function FabricDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const fabric = await getFabric(params.id);

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <div className="mb-6">
        <Link
          href="/fabrics"
          className="inline-block text-sm text-gray-600 hover:text-black transition underline"
        >
          ← Back to All Fabrics
        </Link>
      </div>

      {fabric.image && (
       <div className="mb-6 mt-2">
        <FabricZoomImage src={fabric.image} alt={fabric.name} />
      </div>
      )}
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{fabric.name}</h1>
      <h2 className="text-lg text-gray-500 mb-4">{fabric.title}</h2>
      <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full">
        Category: {fabric.category}
      </span>
      <p className="mt-6 text-sm text-gray-800">{fabric.description}</p>
    </main>
  );
}
