"use client";

import ModeBox from "./modeBox";

type HeadProps = {
  onSearch: (query: string) => void;
}

export default function Head({ onSearch }: HeadProps) {
  return (
    <header className="flex items-center w-full h-fit bg-(--sidebar) p-2.5 transition-all duration-200 sm:p-1.5 gap-3">
      <input
        type="text"
        className="flex-1 h-8 px-3 rounded-md font-bold bg-(--search-box) text-(--text) outline-none transition-all duration-200"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <ModeBox iscolumn={false} />
    </header>
  );
}