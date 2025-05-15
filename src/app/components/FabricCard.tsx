import Image from "next/image";
import Link from "next/link";

interface FabricProps {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export default function FabricCard({ _id, name, title, category, description, image }: FabricProps) {
  return (
    <Link href={`/fabrics/${_id}`}>
      <div className="border rounded shadow-sm bg-white hover:shadow-md transition cursor-pointer">
        {image && (
          <div className="relative w-full h-40">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-t"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-800">{title}</p>
          <span className="text-xs inline-block mt-2 bg-gray-100 px-2 py-1 rounded-full text-gray-900">
            {category}
          </span>
          <p className="mt-2 text-sm text-amber-950">{description}</p>
        </div>
      </div>
    </Link>
  );
}
