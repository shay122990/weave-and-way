export const dynamic = "force-dynamic"; 
import Image from "next/image";

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
    <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      {fabric.image && (
        <div className="relative w-full h-64 mb-6">
          <Image
            width={500}
            height={500}
            src={fabric.image}
            alt={fabric.name}
            className="object-cover w-full h-full rounded"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">{fabric.name}</h1>
      <h2 className="text-lg text-gray-500 mb-4">{fabric.title}</h2>
      <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full">
        Category: {fabric.category}
      </span>
      <p className="mt-6 text-sm text-gray-800">{fabric.description}</p>
    </main>
  );
}
