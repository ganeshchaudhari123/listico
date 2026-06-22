import React from "react";
import { Sparkles, Download, HardDrive, RefreshCw, Layers, ShieldCheck, Cpu } from "lucide-react";
import { PresetStyle, GeneratedImage } from "../types";

interface GeneratorStudioScreenProps {
  promptText: string;
  setPromptText: (val: string) => void;
  selectedStyle: string;
  setSelectedStyle: (val: string) => void;
  aspectRatio: string;
  setAspectRatio: (val: string) => void;
  styles: PresetStyle[];
  onGenerate: () => void;
  isGenerating: boolean;
  generatedResult: GeneratedImage | null;
  onInspireMe: () => void;
  onFocusInput: () => void;
  focusedInput: string | null;
}

export default function GeneratorStudioScreen({
  promptText,
  setPromptText,
  selectedStyle,
  setSelectedStyle,
  aspectRatio,
  setAspectRatio,
  styles,
  onGenerate,
  isGenerating,
  generatedResult,
  onInspireMe,
  onFocusInput,
  focusedInput,
}: GeneratorStudioScreenProps) {

  const handleDownload = () => {
    if (!generatedResult) return;
    try {
      const link = document.createElement("a");
      link.href = generatedResult.url;
      link.download = `listico-img-${generatedResult.style.toLowerCase()}-${generatedResult.aspectRatio.replace(":", "x")}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to download", e);
    }
  };

  const aspectRatiosList = [
    { label: "1:1 Square", value: "1:1", desc: "Default grid mapping" },
    { label: "3:4 Portrait", value: "3:4", desc: "Standard product card" },
    { label: "16:9 Wide", value: "16:9", desc: "E-shop details banner" },
    { label: "4:3 Classic", value: "4:3", desc: "Optimized catalog" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#090d16] text-white overflow-y-auto px-4 pb-14 select-none scrollbar-thin">
      
      {/* Brand Header */}
      <div className="flex items-center justify-between py-4 border-b border-white/5 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#8b5cf6] flex items-center justify-center p-0.5">
            <div className="bg-[#090d16] w-full h-full rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Listico</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Bypass Engine v4.2</p>
          </div>
        </div>

        <button 
          onClick={onInspireMe}
          className="text-[10px] bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-white border border-sky-550/30 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          id="btn-inspire-prompt-studio"
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>Inspire me</span>
        </button>
      </div>

      {/* CORE GENERATOR WORKSPACE */}
      <div className="space-y-4 mt-3">
        
        {/* Prompt Input Block */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-pink-400">Prompt / Product Idea</label>
            <span className="text-[9px] font-mono text-slate-450">{promptText.length} chars</span>
          </div>

          <textarea
            id="input-prompt-studio"
            value={promptText}
            placeholder="Describe your e-commerce product / avatar layout... e.g. 'A friendly baby monster waving'"
            onFocus={onFocusInput}
            readOnly
            className={`w-full bg-slate-950/80 border text-xs leading-relaxed rounded-xl p-3 outline-none min-h-[70px] resize-none transition-all ${
              focusedInput === "prompt" ? "border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]" : "border-white/5"
            }`}
          />
          <p className="text-[9px] text-slate-400 mt-1 italic">
            * Tab input and type via Virtual Keyboard on the third Phone!
          </p>
        </div>

        {/* Aspect Ratio Slices */}
        <div>
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#a855f7] block mb-2">Aspect Ratio Calibration</label>
          <div className="grid grid-cols-2 gap-2">
            {aspectRatiosList.map((ratio) => (
              <button
                key={ratio.value}
                id={`ratio-btn-${ratio.value.replace(":", "-")}`}
                onClick={() => setAspectRatio(ratio.value)}
                className={`text-left p-2 rounded-xl transition-all border outline-none cursor-pointer ${
                  aspectRatio === ratio.value 
                    ? "bg-purple-950/40 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.15)]" 
                    : "bg-slate-950/60 border-white/5 hover:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${aspectRatio === ratio.value ? 'bg-[#a855f7]' : 'bg-slate-450'}`} />
                  <span className="text-xs font-semibold">{ratio.value}</span>
                </div>
                <span className="text-[9px] text-slate-450 block ml-3 mt-0.5 font-mono">{ratio.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Styles Slider Carousel */}
        <div>
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#0ea5e9] block mb-2">Art Styles Modifier</label>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin snap-x px-1">
            {styles.map((style) => (
              <button
                key={style.id}
                id={`style-btn-${style.id}`}
                onClick={() => setSelectedStyle(style.name)}
                className={`snap-center shrink-0 w-[84px] text-left rounded-xl overflow-hidden transition-all border outline-none cursor-pointer ${
                  selectedStyle === style.name 
                    ? "border-pink-500 bg-pink-950/10 shadow-[0_0_8px_rgba(236,72,153,0.3)] scale-[1.02]" 
                    : "border-white/5 bg-slate-950/60 hover:border-slate-800"
                }`}
              >
                <div className="relative h-14 w-full">
                  <img 
                    src={style.image} 
                    alt={style.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-1.5">
                  <h3 className="text-[10px] font-bold text-white leading-tight truncate">{style.name}</h3>
                  <p className="text-[8px] text-slate-400 group-hover:text-slate-300 truncate">{style.id}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CORE GENERATE BUTTON */}
        <button
          onClick={onGenerate}
          disabled={isGenerating || !promptText.trim()}
          id="btn-trigger-ai-generation"
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border shadow-lg ${
            isGenerating 
              ? "bg-slate-800 border-slate-700 text-slate-400 select-none animate-pulse" 
              : !promptText.trim() 
              ? "bg-slate-900/40 border-white/5 text-slate-450 pointer-events-none"
              : "bg-gradient-to-r from-pink-500 to-[#a855f7] hover:from-pink-600 hover:to-[#9333ea] text-white border-transparent hover:shadow-purple-500/10 active:scale-[0.98]"
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Pixel morphing in action...</span>
            </>
          ) : (
            <>
              <Cpu className="w-3.5 h-3.5" />
              <span>Regenerate & Cleans Metadata</span>
            </>
          )}
        </button>

        {/* GENERATED PRODUCT IMAGE RESULT SHIELD */}
        {isGenerating && (
          <div className="bg-slate-950/90 rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center text-center animate-pulse gap-3.5 h-[240px]">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-pink-400 border-t-transparent animate-spin flex items-center justify-center" />
              <Layers className="w-4 h-4 text-pink-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Processing duplicate-bypass algorithms</p>
              <p className="text-[9px] text-slate-400 mt-1 max-w-[200px]">Altering pixels subtly, purging EXIF tags, and synthesizing low weight shipping slabs...</p>
            </div>
          </div>
        )}

        {!isGenerating && generatedResult && (
          <div className="bg-slate-900/60 rounded-2xl p-3 border border-pink-500/20 shadow-xl space-y-3 animate-fade-in mb-8" id="generated-result-card">
            
            {/* Real-time altered comparison badge */}
            <div className="flex items-center justify-between text-[9px] font-mono border-b border-white/5 pb-2">
              <span className="text-emerald-400 flex items-center gap-1 uppercase font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Algorithmic duplicate Bypass OK
              </span>
              <span className="text-slate-400">{generatedResult.md5Hash.substring(0, 8)}: MD5</span>
            </div>

            {/* Generated Output */}
            <div className={`relative bg-black rounded-lg overflow-hidden border border-slate-800 ${
              generatedResult.aspectRatio === "9:16" ? "h-64" : "h-48"
            }`}>
              <img 
                src={generatedResult.url} 
                alt="Generated Output"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain" 
              />
              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[8px] font-bold text-pink-400 tracking-wide font-mono uppercase">
                {generatedResult.style}
              </div>
            </div>

            {/* Logistics mapping dashboard specs */}
            <div className="space-y-1.5 bg-slate-950/70 p-2.5 rounded-xl text-[9px] font-mono border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-405">EXIF METADATA</span>
                <span className="text-emerald-400 font-bold">STRIPPED / SANITIZED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-405">PIXEL REDUNDANCY</span>
                <span className="text-[#a855f7] font-bold">-16.42% Sub-pixel noise</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-405">SHIPPING WEIGHT SLAB</span>
                <span className="text-[#0ea5e9] font-bold">Mapped: Low weight &lt;1kg</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                id="btn-download-studio-output"
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer select-none active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to Disk</span>
              </button>
              <button
                onClick={onInspireMe}
                className="p-2 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-300 rounded-xl"
                title="Regenerate Seed"
                id="btn-regenerate-prompt-studio"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Informative placeholder helper in beginning */}
        {!isGenerating && !generatedResult && (
          <div className="border border-dashed border-slate-800 rounded-2xl p-6 text-center text-slate-450 text-[11px] h-[180px] flex flex-col justify-center items-center gap-2">
            <Layers className="w-7 h-7 text-slate-600 stroke-[1.5]" />
            <div>
              <p className="font-semibold text-slate-400">Ready to regenerate duplicate-free listings</p>
              <p className="text-[10px] text-slate-450 max-w-[200px] mx-auto mt-0.5">Define your creative idea or click "Inspire me" to try a trending catalog modifier preset.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
