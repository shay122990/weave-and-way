"use client";

import { useEffect, useState } from "react";
import FabricCard from "@/app/components/FabricCard";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export default function FabricsClient() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [filtered, setFiltered] = useState<Fabric[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;


    useEffect(() => {
    const fetchFabrics = async () => {
        setLoading(true);
        const res = await fetch("/api/fabrics");
        const data = await res.json();
        setFabrics(data);
        setFiltered(data);
        setLoading(false);

        const allCategories = Array.from(
        new Set(data.map((f: Fabric) => f.category))
        ) as string[];

        setCategories(["all", ...allCategories]);
    };

    fetchFabrics();
    }, []);


  useEffect(() => {
    let result = fabrics;

    if (category !== "all") {
      result = result.filter(f => f.category === category);
    }

    if (searchTerm) {
      result = result.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.category.toLowerCase().includes(searchTerm.toLowerCase())
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
  <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
    {/* Sidebar */}
    <aside className="md:w-64 w-full md:h-screen bg-black/20 backdrop-blur p-6 border-r border-white/10 sticky top-0 z-10">
      <h2 className="text-2xl font-bold mb-6 tracking-wide">Categories</h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => setCategory(cat)}
              className={`capitalize w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                category === cat
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6 md:p-10">
      {/* Search Input */}
      <div className="mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search fabrics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading fabrics...</p>
      ) : (
        <>
          {/* Fabric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map(fabric => (
              <FabricCard key={fabric._id} {...fabric} />
            ))}
          </div>

          {/* No Results */}
          {paginated.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No fabrics found.</p>
          )}

          {/* Pagination */}
          {filtered.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {Array.from({ length: Math.ceil(filtered.length / ITEMS_PER_PAGE) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === i + 1
                      ? "bg-white text-black font-semibold"
                      : "bg-white/10 hover:bg-white/20 text-white"
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