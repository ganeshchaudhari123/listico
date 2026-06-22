import React, { useState, useMemo } from "react";
import { Search, Sparkles, Heart, Flame, Eye, RefreshCw } from "lucide-react";
import { GeneratedImage } from "../types";
import OnScreenKeyboard from "./OnScreenKeyboard";

interface DiscoveryScreenProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  galleryImages: GeneratedImage[];
  onUsePromptInStudio: (prompt: string, style: string) => void;
  onFocusInput: () => void;
  focusedInput: string | null;
  onKeyPress: (char: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export default function DiscoveryScreen({
  searchQuery,
  setSearchQuery,
  galleryImages,
  onUsePromptInStudio,
  onFocusInput,
  focusedInput,
  onKeyPress,
  onDelete,
  onClear,
}: DiscoveryScreenProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Trending");
  const [clickedLikeId, setClickedLikeId] = useState<string | null>(null);

  const categories = ["Trending", "Hot", "New", "Creatures", "Products"];

  // Filter images based on search query AND category tag
  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => {
      // Search matching
      const matchesSearch = 
        img.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter matching
      if (activeCategory === "Trending") return true; 
      if (activeCategory === "Hot") return img.likes > 250;
      if (activeCategory === "New") return img.id === "astro_bunny" || img.id === "cyber_rex";
      if (activeCategory === "Creatures") {
        return img.prompt.toLowerCase().includes("monster") || img.prompt.toLowerCase().includes("bunny") || img.prompt.toLowerCase().includes("rex");
      }
      if (activeCategory === "Products") {
        return img.prompt.toLowerCase().includes("toaster") || img.prompt.toLowerCase().includes("vase") || img.prompt.toLowerCase().includes("ceramic");
      }
      return true;
    });
  }, [galleryImages, searchQuery, activeCategory]);

  const handleLikeClick = (id: string) => {
    setClickedLikeId(id);
    setTimeout(() => setClickedLikeId(null), 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#090d16] text-white overflow-hidden relative">
      
      {/* Scrollable upper container */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin flex flex-col">
        
        {/* Title Header */}
        <div className="py-4 border-b border-white/5 bg-[#090d16]/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold tracking-tight flex items-center gap-1.5 text-slate-100">
              <Flame className="w-4 h-4 text-pink-400 fill-pink-500/20" />
              <span>Slabs Explorer</span>
            </h1>
            <p className="text-[10px] text-slate-400">Live duplicate-free catalog models</p>
          </div>
          <span className="bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
            MD5 Cleared
          </span>
        </div>

        {/* Search Input block */}
        <div className="mt-3 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 z-10">
            <Search className="w-4 h-4 text-slate-400" />
          </span>
          <input
            type="text"
            id="input-discovery-search"
            placeholder="Search characters or prompts..."
            value={searchQuery}
            onFocus={onFocusInput}
            readOnly
            className={`w-full bg-slate-950/85 border text-xs rounded-xl pl-10 pr-3 py-2.5 outline-none font-medium transition-all ${
              focusedInput === "search" ? "border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.2)]" : "border-white/5"
            }`}
          />
        </div>

        {/* Filter Badges Horizontal Roll */}
        <div className="flex gap-1.5 overflow-x-auto py-3 shrink-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              id={`badge-btn-${c.toLowerCase()}`}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                activeCategory === c 
                  ? "bg-pink-500 border-pink-400 text-white shadow-sm shadow-pink-500/20" 
                  : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-[220px]">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <div 
                key={img.id}
                id={`gallery-item-${img.id}`}
                className="group relative bg-[#0f172a]/60 rounded-xl overflow-hidden border border-white/5 flex flex-col justify-between"
              >
                {/* Graphics frame */}
                <div className="relative h-28 bg-[#090d16] flex items-center justify-center overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.prompt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 z-10" />

                  {/* Likes badge */}
                  <button 
                    onClick={() => handleLikeClick(img.id)}
                    className="absolute top-1.5 right-1.5 bg-black/55 backdrop-blur-md border border-white/10 p-1.5 rounded-lg active:scale-90 transition-transform cursor-pointer z-20 flex items-center gap-1"
                  >
                    <Heart className={`w-3 h-3 ${clickedLikeId === img.id ? "text-red-500 fill-red-500 animate-ping" : "text-pink-400 fill-pink-500/20"}`} />
                    <span className="text-[8px] font-mono font-bold">{img.likes + (clickedLikeId === img.id ? 1 : 0)}</span>
                  </button>
                </div>

                {/* Info and load control strip */}
                <div className="p-2 space-y-1.5 bg-slate-950/70 relative">
                  <h3 className="text-[10px] font-bold text-slate-100 truncate flex justify-between items-center">
                    <span>{img.id.charAt(0).toUpperCase() + img.id.slice(1).replace("_", " ")}</span>
                    <span className="text-[8px] font-mono text-slate-450 uppercase">{img.style}</span>
                  </h3>
                  
                  <p className="text-[9px] text-slate-400 leading-tight line-clamp-2 h-6">
                    {img.prompt}
                  </p>

                  <button
                    onClick={() => onUsePromptInStudio(img.prompt, img.style)}
                    id={`btn-use-prompt-${img.id}`}
                    className="w-full py-1 text-center bg-slate-900 hover:bg-pink-500/10 border border-white/5 group-hover:border-pink-500/30 text-[9px] rounded-lg font-bold text-slate-300 group-hover:text-pink-400 transition-all flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Copy to Studio</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-slate-450 flex flex-col justify-center items-center py-10 gap-2 border border-dashed border-slate-800 rounded-2xl h-[160px]">
              <RefreshCw className="w-5 h-5 text-slate-600 animate-spin" />
              <div>
                <p className="font-semibold text-xs">No matching slabs found</p>
                <p className="text-[9px] text-slate-455">Clear search or choose a different categories badge.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* TACTILE ON-SCREEN KEYBOARD (Floating at the absolute bottom of Phone Screen 3) */}
      <div className="shrink-0">
        <OnScreenKeyboard
          onKeyPress={onKeyPress}
          onDelete={onDelete}
          onClear={onClear}
        />
      </div>

    </div>
  );
}
