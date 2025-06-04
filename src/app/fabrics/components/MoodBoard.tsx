"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Fabric {
  _id: string;
  name: string;
  image?: string;
}

interface MoodBoardProps {
  fabrics: Fabric[];
  max?: number;
}

export default function MoodBoard({ fabrics, max = 6 }: MoodBoardProps) {
  const [swatches, setSwatches] = useState<Fabric[]>([]);

  useEffect(() => {
    const withImages = fabrics.filter((f) => f.image);
    const random = withImages.sort(() => 0.5 - Math.random()).slice(0, max);
    setSwatches(random);
  }, [fabrics, max]);

  if (swatches.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {swatches.map((fabric) => (
          <div
            key={fabric._id}
            className="w-20 h-20 min-w-[5rem] rounded overflow-hidden border border-gray-300 shadow-sm"
            title={fabric.name}
          >
            <Image
              src={fabric.image!}
              alt={fabric.name}
              width={58}
              height={58}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
