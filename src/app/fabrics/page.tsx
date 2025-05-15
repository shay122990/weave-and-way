import FabricCard from "@/app/components/FabricCard";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
}

async function getFabrics(): Promise<Fabric[]> {
  const res = await fetch("http://localhost:3000/api/fabrics", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch fabrics");

  return res.json();
}

export default async function FabricsPage() {
  const fabrics = await getFabrics();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {fabrics.map((fabric) => (
        <FabricCard key={fabric._id} {...fabric} />
      ))}
    </main>
  );
}
