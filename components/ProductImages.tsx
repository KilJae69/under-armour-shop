"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaItem } from "@wix/stores_products";


// type MediaItem = {
//   _id?: string | undefined;
//   image: {
//     url: string;
//   };
// };

type ProductImagesProps = {
  images: MediaItem[];
};
export default function ProductImages({ images }: ProductImagesProps) {
  const [index, setIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setIndex(index);
  };


  return (
    <div className="">
      <div className="relative h-[500px]">
        <Image
          src={images[index].image?.url || ""}
          alt=""
          sizes="(max-width:1023) 100vw, 50vw"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-4">
        {images.map((image, index) => (
          <div
            key={image._id}
            onClick={() => handleImageChange(index)}
            className="relative mt-8 h-32 w-1/4 cursor-pointer gap-4"
          >
            <Image
              src={image.image?.url || ""}
              alt=""
              sizes="30vw"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
