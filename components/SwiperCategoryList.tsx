"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { collections } from "@wix/stores";

type SwiperCategoryListProps = {
  categories: collections.Collection[];
};

export default function SwiperCategoryList({
  categories,
}: SwiperCategoryListProps) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        freeMode={true}
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className=""
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category._id}
            className="w-auto max-w-[300px] " // Adjust the width as per your needs
          >
            <Link href={`/list?cat=${category.slug}`} className="w-full">
              <div className="relative h-96 w-full bg-slate-100">
                <Image
                  src={category.media?.mainMedia?.image?.url || "/category.png"}
                  alt={category.name ?? "N/A"}
                  fill
                  quality={100}
                  sizes="(max-width:380px) 100vw, (max-width:650px) 50vw, (max-width:950px) 33vw"
                  className="object-cover"
                />
              </div>
              <h1 className="mt-8 text-xl font-light tracking-wide">
                {category.name}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
