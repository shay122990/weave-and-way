import Link from "next/link";
import { headers } from "next/headers";

export default async function CategoriesNav() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/fabric-categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-center text-gray-500">Failed to load categories.</p>;
  }

  const categories: string[] = await res.json();

  return (
    <section className="py-6 px-6 bg-white">
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="flex justify-center gap-2 lg:gap-20">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/fabrics?category=${encodeURIComponent(category)}`}
              className="px-1 md:px-4 py-2 text-sm md:text-lg text-black rounded uppercase hover:text-[#40826D]"
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
