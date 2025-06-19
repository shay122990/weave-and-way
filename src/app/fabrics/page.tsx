"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FabricCard from "@/app/fabrics/components/FabricCard";
import MoodBoard from "./components/MoodBoard";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

export default function Fabrics() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "all";

  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [filtered, setFiltered] = useState<Fabric[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchFabrics = async () => {
      setLoading(true);
      const res = await fetch("/api/fabrics");
      const data = (await res.json()) as Fabric[];
      setFabrics(data);
      setFiltered(data);
      setLoading(false);

      const allCategories = Array.from(new Set(data.map((f) => f.category)));
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
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", cat);
    router.replace(`/fabrics?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {/* hero */}
      <div className="relative w-full h-[400px] md:h-[600px]">
        <Image
          src="/fabrics.jpg"
          alt="hero image of fabric"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl font-bold drop-shadow-lg">
            Fabrics for every story
          </h1>
          <p className="text-white text-sm sm:text-lg mt-2 font-medium drop-shadow-md">
            Textures that inspire. Quality that lasts.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>
      {/* mobile fabric menu */}
      <button
        onClick={() => setSideMenuOpen(true)}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 z-40 bg-black text-white px-3 py-2 rounded-r-lg shadow-lg hover:bg-gray-800 block md:hidden"
      >
        fabrics →
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${sideMenuOpen ? "translate-x-0" : "-translate-x-full"} block md:hidden`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Categories</h2>
          <button
            onClick={() => setSideMenuOpen(false)}
            className="text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        {/* mobile categories */}
        <ul className="p-4 space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  handleCategoryChange(cat);
                  setSideMenuOpen(false);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className={`w-full text-left px-4 py-2 rounded-lg capitalize transition duration-200 font-medium ${
                  category === cat
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {sideMenuOpen && (
        <div
          onClick={() => setSideMenuOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 block md:hidden"
        />
      )}
      {/* dekstop sidebar */}
      <div className="flex flex-col md:flex-row bg-white text-black">
        <aside
          className={`md:w-64 w-full md:h-screen bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2]/50 p-6 border-r border-gray-300 shadow-inner 
          ${sideMenuOpen ? "block" : "hidden"} md:block sticky top-0 z-10`}
        >
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
                  onClick={() => {
                    handleCategoryChange(cat);
                    setSideMenuOpen(false);
                  }}
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
        {/* fabrics display */}
        <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-8">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Explore Our Fabrics
            </h1>
            <p className="mt-2 text-gray-600 max-w-md">
              Discover high-quality fabrics across all styles and categories.
              Use the filters to find your perfect material.
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
            <p className="text-center text-gray-400 text-lg">
              Loading fabrics...
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
