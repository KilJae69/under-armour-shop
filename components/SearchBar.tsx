"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();

    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;

        if(name) router.push(`/list?name=${name}`);
    }

  return (
    <form className="flex flex-1 justify-between gap-4 rounded-md bg-gray-100 p-2" onSubmit={handleSearch}>
      <input type="text" placeholder="Search" name="name" className="flex-1 bg-transparent outline-none"/>
      <button className="cursor-pointer">
        <Image src="/search.png" alt="Search Icon" width={16} height={16} />
      </button>
    </form>
  );
}
