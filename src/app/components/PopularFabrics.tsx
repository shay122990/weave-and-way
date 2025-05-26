'use client';

import Image from 'next/image';

interface FabricCategory {
  id: number;
  name: string;
  image: string;
}

const popularCategories: FabricCategory[] = [
  { id: 1, name: 'Cotton', image: '/popular/cotton.webp' },
  { id: 2, name: 'Linen', image: '/popular/linen.jpg' },
  { id: 3, name: 'Satin', image: '/popular/satin.webp' },
  { id: 4, name: 'Silk', image: '/popular/silk.webp' },
  { id: 5, name: 'Crepe', image: '/popular/crepe.webp' },
];

export default function PopularFabrics() {
  return (
    <section className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-4">Most Popular Fabrics</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {popularCategories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-48 bg-white rounded shadow p-2 hover:shadow-md transition"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={192}
                height={192}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium text-sm text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}