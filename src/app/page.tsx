import Image from "next/image";
import CategoriesNav from "./components/CategoriesNav";
import HomeIntro from "./components/Home-Intro";
import PopularFabrics from "./components/PopularFabrics";

export default function Home() {
  return (
    <>
      <CategoriesNav />
      
      <div className="relative w-full h-[400px] md:h-[600px]">
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

      <HomeIntro />
      <PopularFabrics />
    </>
  );
}
