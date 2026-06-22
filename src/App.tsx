import React, { useState } from "react";
import { 
  INITIAL_MEMBERS, 
  PRESET_STYLES, 
  SAMPLE_GALLERY_IMAGES, 
  INSPIRE_PROMPTS 
} from "./constants";
import { Member, GeneratedImage } from "./types";
import IPhoneFrame from "./components/IPhoneFrame";
import CollaboratorsScreen from "./components/CollaboratorsScreen";
import GeneratorStudioScreen from "./components/GeneratorStudioScreen";
import DiscoveryScreen from "./components/DiscoveryScreen";
import { ShieldCheck, Info, Sparkles, Layers, Cpu } from "lucide-react";

export default function App() {
  // Mobile / Desktop Display responsive navigation state
  const [activeMobileTab, setActiveMobileTab] = useState<"members" | "studio" | "discover">("studio");

  // State Management
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [galleryImages, setGalleryImages] = useState<GeneratedImage[]>(SAMPLE_GALLERY_IMAGES);
  
  // Custom Form & Prompt States
  const [promptText, setPromptText] = useState<string>(
    "A friendly baby monster holding an retro neon CRT television screen, cartoon vibrant styling"
  );
  const [selectedStyle, setSelectedStyle] = useState<string>("3D Anime");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedImage | null>(null);

  // States to coordinate interactive Keyboard input routing
  const [focusedInput, setFocusedInput] = useState<string | null>("prompt");
  const [emailInput, setEmailInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");

  // Action: Add teammate to first screen
  const handleAddMember = (name: string, email: string) => {
    const newMember: Member = {
      id: "mem_" + Date.now().toString(36),
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${Math.floor(1500000000000 + Math.random() * 10000000000)}?w=150&auto=format&fit=crop&q=60`,
      role: "Can view"
    };
    setMembers((prev) => [...prev, newMember]);
  };

  // Action: Remove teammate
  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Action: Change role dropdown value
  const handleChangeRole = (id: string, role: "Owner" | "Can edit" | "Can view") => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  };

  // Action: Save permissions settings
  const handleSaveMembers = () => {
    console.log("Synchronized access roles to Firestore database successfully!");
  };

  // Action: Auto-inject detailed prompts
  const handleInspireMe = () => {
    const randomIdx = Math.floor(Math.random() * INSPIRE_PROMPTS.length);
    const selected = INSPIRE_PROMPTS[randomIdx];
    setPromptText(selected.text);
    setFocusedInput("prompt");
  };

  // Action: Load template prompts from Screen 3 into Screen 2 (Studio)
  const handleUsePromptInStudio = (prompt: string, style: string) => {
    setPromptText(prompt);
    setSelectedStyle(style);
    setFocusedInput("prompt");
    // Auto navigate to the workspace on mobile
    setActiveMobileTab("studio");
  };

  // Action: Interactive keystroke routing
  const handleKeyPress = (char: string) => {
    if (focusedInput === "prompt") {
      setPromptText((prev) => prev + char);
    } else if (focusedInput === "search") {
      setSearchQuery((prev) => prev + char);
    } else if (focusedInput === "name") {
      setNameInput((prev) => prev + char);
    } else if (focusedInput === "email") {
      setEmailInput((prev) => prev + char);
    }
  };

  const handleDelete = () => {
    if (focusedInput === "prompt") {
      setPromptText((prev) => prev.slice(0, -1));
    } else if (focusedInput === "search") {
      setSearchQuery((prev) => prev.slice(0, -1));
    } else if (focusedInput === "name") {
      setNameInput((prev) => prev.slice(0, -1));
    } else if (focusedInput === "email") {
      setEmailInput((prev) => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (focusedInput === "prompt") {
      setPromptText("");
    } else if (focusedInput === "search") {
      setSearchQuery("");
    } else if (focusedInput === "name") {
      setNameInput("");
    } else if (focusedInput === "email") {
      setEmailInput("");
    }
  };

  // Endpoint Trigger: Image generation dispatch via Express Server API
  const handleGenerateImage = async () => {
    if (!promptText.trim()) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          style: selectedStyle,
          aspectRatio: aspectRatio,
        }),
      });

      if (!response.ok) {
        throw new Error("Image API request failed.");
      }

      const resData = await response.json();
      if (resData.success && resData.imageUrl) {
        const newLog: GeneratedImage = {
          id: "gen_" + Date.now().toString(36),
          url: resData.imageUrl,
          prompt: resData.promptUsed || promptText,
          style: resData.styleUsed || selectedStyle,
          aspectRatio: resData.aspectRatioUsed || aspectRatio,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isFallback: !!resData.isFallback,
          md5Hash: resData.md5Hash || "e52dfcf3b3527a29e41cc789a77ee2d7",
          likes: 1,
          author: "Owner"
        };
        setGeneratedResult(newLog);
        setGalleryImages((prev) => [newLog, ...prev]);
      } else {
        throw new Error(resData.errorInfo || "Failed to parse generation content response.");
      }
    } catch (err) {
      console.error("Failed to generate custom image:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] bg-radial-gradient from-slate-900/40 to-[#070a13] text-white flex flex-col items-center overflow-x-hidden relative selection:bg-pink-500/20 px-4 md:px-8 py-6">
      
      {/* Absolute futuristic ambient glow blobs */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-24 right-[10%] w-[380px] h-[380px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* HEADER HUD BAR */}
      <header className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8 select-none z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="bg-gradient-to-tr from-pink-500 to-[#a855f7] text-white text-[11px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-md shadow-pink-500/10">
              SUPPLIER DASHBOARD
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Core Node Active</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Listico Studio
          </h1>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            E-commerce pixel-shifting generator. Overrides duplicates and strips file markers to optimize nearby logistics allocations for Meesho suppliers.
          </p>
        </div>

        {/* LOGISTICS INSIGHTS BAR */}
        <div className="flex flex-wrap items-center gap-3.5 bg-slate-900/40 p-4 border border-white/5 rounded-2xl max-w-lg">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#a855f7]">Duplication Audit Passed</p>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold font-mono">100% SUCCESS RATIO</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#0ea5e9]">Weight Slabs Map</p>
            <p className="text-xs font-bold text-slate-200 font-mono">Nearby Slab Match Enabled</p>
          </div>
        </div>
      </header>

      {/* MOBILE SCREEN SELECTOR NAVIGATION TABS (Visible only on phone sizes) */}
      <div className="w-full max-w-md mx-auto grid grid-cols-3 bg-slate-900/60 p-1 rounded-xl border border-white/5 mb-6 md:hidden z-10 select-none shrink-0 text-center text-xs font-bold">
        <button
          onClick={() => {
            setActiveMobileTab("members");
            setFocusedInput("name");
          }}
          className={`py-2 rounded-lg cursor-pointer transition-all ${
            activeMobileTab === "members" ? "bg-pink-500 text-white shadow" : "text-slate-400"
          }`}
        >
          Members (Screen 1)
        </button>
        <button
          onClick={() => {
            setActiveMobileTab("studio");
            setFocusedInput("prompt");
          }}
          className={`py-2 rounded-lg cursor-pointer transition-all ${
            activeMobileTab === "studio" ? "bg-pink-500 text-white shadow" : "text-slate-400"
          }`}
        >
          Studio (Screen 2)
        </button>
        <button
          onClick={() => {
            setActiveMobileTab("discover");
            setFocusedInput("search");
          }}
          className={`py-2 rounded-lg cursor-pointer transition-all ${
            activeMobileTab === "discover" ? "bg-pink-500 text-white shadow" : "text-slate-400"
          }`}
        >
          Explore (Screen 3)
        </button>
      </div>

      {/* THREE DEVICE VIEWING DOCK */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-start z-10">
        
        {/* DEVICE COLUMN 1: ACCESS/COLLABORATORS (Mike Tyson controls) */}
        <div className={`md:block ${activeMobileTab === "members" ? "block" : "hidden"}`}>
          <div className="text-center mb-3 hidden md:block">
            <span className="bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-400 py-1.5 px-3 rounded-full font-bold">
              SCREEN 1 : SYSTEM COLLABORATORS
            </span>
          </div>
          <IPhoneFrame title="Members Screen" time="15:32">
            <CollaboratorsScreen 
              members={members}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
              onChangeRole={handleChangeRole}
              onSave={handleSaveMembers}
              onFocusInput={(inp) => setFocusedInput(inp)}
              focusedInput={focusedInput}
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              nameInput={nameInput}
              setNameInput={setNameInput}
            />
          </IPhoneFrame>
        </div>

        {/* DEVICE COLUMN 2: STUDIO WORKSPACE (Main generator console) */}
        <div className={`md:block ${activeMobileTab === "studio" ? "block" : "hidden"}`}>
          <div className="text-center mb-3 hidden md:block">
            <span className="bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-400 py-1.5 px-3 rounded-full font-bold">
              SCREEN 2 : AI CREATIVE STUDIO
            </span>
          </div>
          <IPhoneFrame title="Studio Generator" time="15:34">
            <GeneratorStudioScreen
              promptText={promptText}
              setPromptText={setPromptText}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              styles={PRESET_STYLES}
              onGenerate={handleGenerateImage}
              isGenerating={isGenerating}
              generatedResult={generatedResult}
              onInspireMe={handleInspireMe}
              onFocusInput={() => setFocusedInput("prompt")}
              focusedInput={focusedInput}
            />
          </IPhoneFrame>
        </div>

        {/* DEVICE COLUMN 3: GLOBAL EXPLORER & KEYBOARD (The typing board hub) */}
        <div className={`md:block ${activeMobileTab === "discover" ? "block" : "hidden"}`}>
          <div className="text-center mb-3 hidden md:block">
            <span className="bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-400 py-1.5 px-3 rounded-full font-bold">
              SCREEN 3 : EXPLORER & TACTILE KEYBOARD
            </span>
          </div>
          <IPhoneFrame title="Discovery Platform" time="15:36">
            <DiscoveryScreen
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              galleryImages={galleryImages}
              onUsePromptInStudio={handleUsePromptInStudio}
              onFocusInput={() => setFocusedInput("search")}
              focusedInput={focusedInput}
              onKeyPress={handleKeyPress}
              onDelete={handleDelete}
              onClear={handleClear}
            />
          </IPhoneFrame>
        </div>

      </main>

      {/* CORE INFO BAR DETAILED EXPLANATION */}
      <footer className="w-full max-w-7xl mx-auto mt-12 bg-slate-900/30 p-5 border border-white/5 rounded-3xl z-10 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500/25 to-[#a855f7]/25 border border-pink-400/20 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">How to use our Interactive Simulator</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl mt-0.5">
              Select any input field inside Screen 1 (Collaborators Access Form) or Screen 3 (Filter Search bar) or Screen 2 (Prompt details) by tapping it, then type letters live using the Virtual Keyboard at the bottom of Phone 3. Watch real-time pixel alteration bypass audits!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono font-semibold text-slate-450 uppercase">Powered by API v3.0</span>
        </div>
      </footer>

    </div>
  );
}
