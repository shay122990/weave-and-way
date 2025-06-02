"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FabricCard from "@/app/fabrics/components/FabricCard";
import MoodBoard from "./components/MoodBoard";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

export default function FabricsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [filtered, setFiltered] = useState<Fabric[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchFabrics = async () => {
      setLoading(true);
      const res = await fetch("/api/fabrics");
      const data = (await res.json()) as Fabric[];
      setFabrics(data);
      setFiltered(data);
      setLoading(false);

      const allCategories = Array.from(
        new Set(data.map((f: Fabric) => f.category))
      );
      setCategories(["all", ...allCategories]);
    };

    fetchFabrics();
  }, []);

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    setCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    let result = fabrics;

    if (category !== "all") {
      result = result.filter((f) => f.category === category);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.category.toLowerCase().includes(term) ||
          f.color?.toLowerCase().includes(term)
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [category, searchTerm, fabrics]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
      <aside className="md:w-64 w-full md:h-screen bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2]/50 p-6 border-r border-gray-300 shadow-inner sticky top-0 z-10">
        <div className="mb-6">
          <MoodBoard fabrics={fabrics} />
        </div>

        <h2 className="text-xl font-bold mb-4 tracking-wide text-gray-800 uppercase">
          Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-lg capitalize transition duration-200 font-medium ${
                  category === cat
                    ? "bg-[#2c3e50] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#ecf0f1] hover:text-black"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Explore Our Fabrics
          </h1>
          <p className="mt-2 text-gray-600 max-w-md">
            Discover high-quality fabrics across all styles and categories. Use the filters to find your perfect material.
          </p>
        </div>

        <div className="max-w-2xl">
          <input
            type="text"
            placeholder="Search by name, category, or color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading fabrics...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((fabric) => (
                <FabricCard key={fabric._id} {...fabric} />
              ))}
            </div>

            {paginated.length === 0 && (
              <p className="text-center text-gray-500 mt-10 text-lg">
                No fabrics found.
              </p>
            )}

            {filtered.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                {Array.from({
                  length: Math.ceil(filtered.length / ITEMS_PER_PAGE),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full transition text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-gray-200 hover:bg-black/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
