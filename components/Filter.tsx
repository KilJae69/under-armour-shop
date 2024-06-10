"use client";

import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  collections: collections.Collection[];
};

export default function Filter({ collections }: FilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();


  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  };
  return (
    <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row">
      <div className="flex flex-wrap gap-6">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="min-h-[30px] w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="min-h-[30px] w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        {/* TODO: Filter Categories */}
        <select
          name="cat"
          className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium"
          onChange={handleFilterChange}
        >
          <option value={""}>Category</option>
          {collections.map((collection) => (
            <option key={collection._id} value={collection.slug ?? ""}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="rounded-2xl bg-white px-4 py-2 text-xs font-medium ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}
