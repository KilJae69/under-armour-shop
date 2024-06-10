import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import SwiperCategoryList from "./SwiperCategoryList";

export default async function CategoryList() {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();
  // console.log(categories.items[0]);
  return (

    <SwiperCategoryList categories={categories.items} />
    // <div className="scrollbar-hide overflow-x-scroll px-4">
    //   <div className="flex gap-4 md:gap-8">
    //     {categories.items.map((category) => (
    //       <Link
    //         href={`/list?cat=${category.slug}`}
    //         className="w-full shrink-0 sm:w-1/2 lg:w-1/4 xl:w-1/6"
    //         key={category._id}
    //       >
    //         <div className="relative h-96 w-full bg-slate-100">
    //           <Image
    //             src={category.media?.mainMedia?.image?.url || "/category.png"}
    //             alt=""
    //             fill
    //             quality={100}
    //             sizes="20vw"
    //             className="object-cover"
    //           />
    //         </div>
    //         <h1 className="mt-8 text-xl font-light tracking-wide">
    //           {category.name}
    //         </h1>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
  );
}
