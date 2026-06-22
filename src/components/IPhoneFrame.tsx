import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface IPhoneFrameProps {
  children: React.ReactNode;
  title?: string;
  time?: string;
}

export default function IPhoneFrame({ children, time = "9:41" }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto transition-transform duration-500 hover:scale-[1.01]">
      {/* Outer Side Buttons (Sleek side silhouettes of physical phone buttons) */}
      <div className="absolute left-[-11px] top-[110px] w-[3px] h-[30px] bg-slate-700 rounded-l" /> {/* Action Button */}
      <div className="absolute left-[-11px] top-[155px] w-[3px] h-[55px] bg-slate-700 rounded-l" /> {/* Vol Up */}
      <div className="absolute left-[-11px] top-[220px] w-[3px] h-[55px] bg-slate-700 rounded-l" /> {/* Vol Down */}
      <div className="absolute right-[-11px] top-[180px] w-[3px] h-[80px] bg-slate-700 rounded-r" /> {/* Power Button */}

      {/* Main Metallic Rounded Frame */}
      <div className="w-[365px] h-[750px] bg-[#0b0f19] border-[10px] border-[#1e293b] rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-[6px] relative flex flex-col ring-1 ring-white/10">
        
        {/* Inner Glare / Specular highlight reflection edge */}
        <div className="absolute inset-[2px] rounded-[44px] pointer-events-none border border-white/5 z-40" />

        {/* Dynamic Island Pill Capsule */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[112px] h-[26px] bg-[#000] rounded-full z-[9999] flex items-center justify-between px-3 text-[10px] select-none pointer-events-none">
          {/* Glowing Green active camera/sensor dot */}
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          <div className="w-2.5 h-2.5 bg-sky-950/40 rounded-full border border-sky-400/20" /> {/* Camera glass element visual */}
        </div>

        {/* Core Mobile Screen viewport container */}
        <div className="w-full h-full bg-[#030712] rounded-[38px] overflow-hidden relative flex flex-col border border-black/40">
          
          {/* iOS TOP STATUS BAR (9:41 | Signal icons) */}
          <div className="h-[44px] shrink-0 w-full flex items-center justify-between px-6 z-50 select-none text-white font-sans font-semibold text-[13px] pt-1">
            <span className="tracking-tight select-none">{time}</span>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="w-3.5 h-3.5 text-white" fill="currentColor" strokeWidth={1} />
              <span className="text-[10px] font-bold tracking-tighter leading-none pr-0.5">5G</span>
              <Wifi className="w-3.5 h-3.5 text-white" />
              <Battery className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Actual Active Screen content flow */}
          <div className="flex-1 w-full overflow-hidden flex flex-col relative">
            {children}
          </div>

          {/* iOS HOME BAR INDICATOR */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/35 rounded-full z-[999] select-none pointer-events-none hover:bg-white/60 transition-colors" />
        </div>
      </div>
    </div>
  );
}
