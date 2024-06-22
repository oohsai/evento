"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    router.push(`/events/${text}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-[#a4f839]/50 transition focus:ring-2 focus:bg-white/10"
        placeholder="Search events in any city..."
        spellCheck={false}
      />
    </form>
  );
}
