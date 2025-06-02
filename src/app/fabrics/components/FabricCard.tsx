import Image from "next/image";
import Link from "next/link";

interface FabricProps {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

export default function FabricCard({
  _id,
  name,
  color,
  image,
}: FabricProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl shadow hover:shadow-xl transition p-4 text-black space-y-4">
      {image && (
        <div className="relative w-full h-64 rounded overflow-hidden">
          <Image
            src={image}
            alt={name}
            className="object-cover"
            width={500}
            height={300}
          />
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-black">
        {color && <span>{color}</span>}
      </div>

      <h2 className="text-lg font-semibold text-black mt-1">{name}</h2>

       <Link
        href={`/fabrics/${_id}`}
        className="inline-block text-sm text-black hover:text-black/25 transition underline"
      >
        View More Details →
      </Link>
    </div>
  );
}
