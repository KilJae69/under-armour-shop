"use client";
import { heroSlides } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="flex h-full w-max transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className={clsx(
              slide.bg,
              `flex h-full w-screen flex-col gap-16 xl:flex-row`
            )}
          >
            {/* TEXT CONTAINER */}
            <div className="flex h-1/2 flex-col items-center justify-center gap-8 text-center xl:h-full xl:w-1/2 2xl:gap-12">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
                {" "}
                {slide.title}{" "}
              </h1>
              <Link href={"/list"}>
                <button className="rounded-md bg-black px-4 py-3 text-white">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="relative h-1/2 xl:h-full xl:w-1/2">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="(max-width:1277px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 m-auto flex gap-4">
        {heroSlides.map((slide, index) => (
          <div
            className={`flex size-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-600 ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="size-[6px] rounded-full bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
