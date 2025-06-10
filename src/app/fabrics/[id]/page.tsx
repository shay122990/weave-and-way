export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
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

async function getFabric(id: string): Promise<Fabric | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/fabrics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch fabric:", error);
    return null;
  }
}
//  Next.js 15.3.3-compliant page (change when bug is fixed)
export default async function FabricDetailsPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { id } = await props.params;
  const { category } = await props.searchParams;

  const fabric = await getFabric(id);
  if (!fabric) return notFound();

  const categoryQuery = category ? `?category=${encodeURIComponent(category)}` : "";

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <div className="mb-6">
        <Link
          href={`/fabrics/${categoryQuery}`}
          className="inline-block text-sm text-gray-600 hover:text-black transition underline"
          
        >
          ← Back to {category || "all"} fabrics
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
