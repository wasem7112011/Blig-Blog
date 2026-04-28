"use client";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

type BoxProps = {
  iscolumn?: boolean,
  isSidebarOpen?: boolean // زود ده
}

export default function ModeBox({ iscolumn = false, isSidebarOpen = true }: BoxProps) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") || "light";
    setMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode === "dark");
  }, []);

  // اسمع لتغيير الـ mode من tabs تانية
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mode' && e.newValue) {
        setMode(e.newValue);
        document.documentElement.classList.toggle("dark", e.newValue === "dark");
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function toggleMode(newMode: string) {
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newMode);
  }

  return (
    <div className={`modebox flex bg-(--bg-primary) rounded-lg items-center ${
      iscolumn 
        ? 'sm:hidden flex-col w-full h-fit p-1.5 justify-between gap-1' 
        : 'max-sm:hidden ml-2 p-2 h-8'
    }`}>
      <div 
        onClick={() => toggleMode("dark")}
        className={`dark cursor-pointer flex items-center gap-1 p-1 rounded-md hover:bg-(--hovered) hover:text-blue-500 transition-all duration-200 ${
          mode === 'dark' ? 'bg-(--hovered) text-blue-500 pointer-events-none' : ''
        }`}
      >
        <Moon className="text-(--text) w-5 h-5 shrink-0" />
        {isSidebarOpen && (
          <h3 className="text-(--text) text-sm whitespace-nowrap font-bold">
            Dark Mode
          </h3>
        )}
      </div>
      
      <span className={`inline-block bg-(--line) rounded-md ${
        iscolumn 
          ? 'w-full h-0.5' 
          : 'self-stretch w-0.5 mx-1.5'
      }`}></span>
      
      <div 
        onClick={() => toggleMode("light")}
        className={`light cursor-pointer flex items-center gap-1 p-1 rounded-md hover:bg-(--hovered) hover:text-blue-500 transition-all duration-200 ${
          mode === 'light' ? 'bg-(--hovered) text-blue-500 pointer-events-none' : ''
        }`}
      >
        <Sun className="text-(--text) w-5 h-5 shrink-0" />
        {isSidebarOpen && (
          <h3 className="text-(--text) text-sm whitespace-nowrap font-bold">
            Light Mode
          </h3>
        )}
      </div>
    </div>
  );
}