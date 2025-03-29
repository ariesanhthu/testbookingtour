// 'use client'

// import { usePathname, useRouter } from 'next/navigation'

// export const SearchUsers = () => {
//   const router = useRouter()
//   const pathname = usePathname()

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//           const form = e.currentTarget
//           const formData = new FormData(form)
//           const queryTerm = formData.get('search') as string
//           router.push(pathname + '?search=' + queryTerm)
//         }}
//       >
//         <label htmlFor="search">Search for users</label>
//         <input id="search" name="search" type="text" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`${pathname}?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto mt-4">
      <Input
        id="search"
        name="search"
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
};
