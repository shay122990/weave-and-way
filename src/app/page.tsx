"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeIntro from "./components/Home-Intro";
import PopularFabrics from "./components/PopularFabrics";

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/fabric-categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section className="py-6 px-6 bg-white">
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/fabrics?category=${encodeURIComponent(category)}`}
                className="px-4 py-2  text-black rounded uppercase  hover:text-[#40826D]"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </section>
      <div className="relative w-full h-[600px]">
        <Image
          src="/home-hero.jpg"
          alt="hero image of fabric"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl font-bold drop-shadow-lg">
            Sustainable fabrics for conscious creators
          </h1>
          <p className="text-white text-sm sm:text-lg mt-2 font-medium drop-shadow-md">
            Ethically woven. Mindfully made.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>
      <HomeIntro/>
      <PopularFabrics/>
    </>
  );
}
