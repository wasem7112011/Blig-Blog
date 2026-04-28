"use client";

import { useState, useEffect } from "react";
import AddButton from "./sidebarbutton";
import Button from "./sidebarmainbutton";
import { Folder, Trash2, Settings, Plus } from "lucide-react";
import ModeBox from "./modeBox";
import Link from "next/link";

type SideBarProps = {
  onCollectionChange?: (collection: string) => void;
  activeCollection?: string;
}

export default function SideBar({ onCollectionChange, activeCollection = "all-posts" }: SideBarProps){
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open');
    if (saved!== null) setIsOpen(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sidebar-open' && e.newValue!== null) {
        setIsOpen(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function toggleSidebar() {
    setIsOpen(prev =>!prev)
  }

  function handleButtonClick(buttonName: string) {
    onCollectionChange?.(buttonName);
    if (window.innerWidth < 640) setIsOpen(false);
  }

  return(
    <>
      <aside className={`z-10 flex flex-col justify-between self-start h-screen border-solid border-r-2 border-(--line) bg-(--sidebar) transition-all duration-300 ease-in-out p-4 sm:p-2
        sm:w-64 max-sm:${isOpen? 'w-[90%] fixed left-0' : 'w-20'}
      `}>
        <div className="top w-full flex flex-col items-center gap-2">
          <div className={`logo w-full flex items-center
            ${isOpen? 'justify-between' : 'justify-center sm:justify-between'}
          `}>
            <h2 className={`text-2xl font-bold text-blue-600 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Blig Blog
            </h2>

            <div
              onClick={toggleSidebar}
              className="icon hidden max-sm:flex flex-col gap-1 p-2 justify-center cursor-pointer items-center shrink-0 rounded-md hover:bg-(--hovered) active:scale-95 transition-all"
              role="button"
              aria-label="Toggle sidebar"
              aria-expanded={isOpen}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
            >
              <span className={`block w-6 h-0.5 rounded-md bg-blue-500 transition-all duration-300 ${isOpen? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 rounded-md bg-blue-500 transition-all duration-300 ${isOpen? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 rounded-md bg-blue-500 transition-all duration-300 ${isOpen? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </div>

          <Link href={"/new-post"} className="w-full">
            <AddButton>
              <Plus className="w-5 shrink-0" />
              <div className={`ml-1 transition-all duration-300 whitespace-nowrap overflow-hidden
                ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
              `}>
                New Post
              </div>
            </AddButton>
          </Link>

          <Button
            onClick={() => handleButtonClick("all-posts")}
            isActive={activeCollection === "all-posts"}
            tooltip="All Posts"
          >
            <Folder className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              All Posts
            </div>
          </Button>

          <Button
            onClick={() => handleButtonClick("trash")}
            isActive={activeCollection === "trash"}
            tooltip="Trash"
          >
            <Trash2 className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Trash
            </div>
          </Button>

          <hr className="w-full border-none h-0.5 bg-(--line)" />

          <h3 className={`w-full font-bold text-(--text) transition-all duration-300 whitespace-nowrap overflow-hidden
            ${isOpen? 'opacity-100 max-w-full' : 'max-sm:hidden opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
          `}>
            Collections
          </h3>

          <Button
            onClick={() => handleButtonClick("personal")}
            isActive={activeCollection === "personal"}
            tooltip="Personal"
          >
            <Folder className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Personal
            </div>
          </Button>

          <Button
            onClick={() => handleButtonClick("ideas")}
            isActive={activeCollection === "ideas"}
            tooltip="Ideas"
          >
            <Folder className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Ideas
            </div>
          </Button>

          <Button
            onClick={() => handleButtonClick("diary")}
            isActive={activeCollection === "diary"}
            tooltip="Diary"
          >
            <Folder className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Diary
            </div>
          </Button>

          <Button
            onClick={() => handleButtonClick("work")}
            isActive={activeCollection === "work"}
            tooltip="Work"
          >
            <Folder className="w-5 h-5 shrink-0" />
            <div className={`ml-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 sm:opacity-100 sm:max-w-full max-sm:opacity-0'}
            `}>
              Work
            </div>
          </Button>
        </div>

        <div className="down flex flex-col gap-2">
          <ModeBox iscolumn={true} isSidebarOpen={isOpen} />
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-0 max-sm:block hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  );
}