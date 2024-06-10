import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  let cat;
  let collections;

  try {
    [cat, { items: collections }] = await Promise.all([
      wixClient.collections.getCollectionBySlug(
        searchParams?.cat || "all-products"
      ),
      wixClient.collections.queryCollections().find(),
    ]);
  } catch (error) {
    notFound(); 
  }

  return (
    <div className="relative mt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* CAMPAIGN */}
      <div className="hidden h-64 justify-between bg-pink-50 px-4 sm:flex">
        <div className="flex w-1/2 flex-col items-center justify-center gap-8 lg:w-2/3">
          <h1 className="text-2xl font-semibold leading-[48px] text-gray-700 lg:text-4xl">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="w-max rounded-3xl bg-primary px-5 py-3 text-sm text-white">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/2 lg:w-1/3">
          <Image
            src="/girl-points-left.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter collections={collections} />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">
        {cat?.collection?.name} For You!
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
