"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="bg-white text-gray-800">
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about/about-1.jpg"
            alt="Fabric rolls"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white tracking-wide">
            Our Story
          </h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6">
          Weaving Elegance into Every Thread
        </h2>
        <p className="text-lg leading-relaxed">
          At <strong>Weave & Way</strong>, fabric is more than just a material —
          it&apos;s a legacy. For over a decade, we’ve curated timeless textiles
          that blend tradition with modern innovation. Whether you&apos;re a
          designer, maker, or visionary, our fabrics bring your ideas to life.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 pb-20">
        <div>
          <Image
            src="/about/about-2.jpg"
            alt="Studio view"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Our Mission
          </h3>
          <p className="text-lg leading-relaxed">
            Our mission is to empower creators by offering premium fabrics that
            celebrate craftsmanship and sustainability. Every textile in our
            collection is thoughtfully sourced and carefully stored — because we
            believe in quality that speaks for itself.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-10 text-center">
            From Thread to Touch
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/about/about-3.jpg"
                alt="Fabric selection"
                width={300}
                height={200}
                className="rounded-xl mx-auto mb-4"
              />
              <h4 className="font-medium text-lg mb-2">Curated Selection</h4>
              <p className="text-sm text-gray-600">
                We handpick textiles that inspire, sourced from artisans and
                mills worldwide.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/about/about-4.jpg"
                alt="Quality control"
                width={300}
                height={200}
                className="rounded-xl mx-auto mb-4"
              />
              <h4 className="font-medium text-lg mb-2">Quality Control</h4>
              <p className="text-sm text-gray-600">
                Each piece is inspected to meet our standard of durability,
                texture, and color integrity.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/about/about-5.jpg"
                alt="Shipping fabric"
                width={300}
                height={200}
                className="rounded-xl mx-auto mb-4"
              />
              <h4 className="font-medium text-lg mb-2">
                Fast & Thoughtful Shipping
              </h4>
              <p className="text-sm text-gray-600">
                We package your orders with care and efficiency — arriving at
                your doorstep ready to inspire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
