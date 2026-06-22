import { Delete, CornerDownLeft } from "lucide-react";

interface OnScreenKeyboardProps {
  onKeyPress: (char: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export default function OnScreenKeyboard({ onKeyPress, onDelete, onClear }: OnScreenKeyboardProps) {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyClick = (char: string) => {
    // Elegant tiny auditory vibration feedback simulate via Web Audio context api safely
    try {
      const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, actx.currentTime);
      gain.gain.setValueAtTime(0.015, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.05);
      osc.start();
      osc.stop(actx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio contexts blocks
    }
    onKeyPress(char);
  };

  return (
    <div className="bg-[#1c1c1e]/95 backdrop-filter backdrop-blur-xl border-t border-white/5 p-2 select-none z-[800] mt-auto">
      {/* Visual top bar of Keyboard */}
      <div className="flex justify-between items-center px-1 pb-1.5 text-[11px] text-slate-400 font-medium">
        <span>Tap simulated keycaps to type</span>
        <button 
          onClick={onClear} 
          className="text-pink-400 hover:text-pink-300 transition-colors cursor-pointer text-[10px] font-mono tracking-wider active:scale-95"
          id="btn-kbd-clear-all"
        >
          CLEAR ALL
        </button>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        {/* Row 1 */}
        <div className="flex justify-center gap-[4px] w-full">
          {row1.map((char) => (
            <button
              key={char}
              id={`key-${char.toLowerCase()}`}
              onClick={() => handleKeyClick(char)}
              className="flex-1 max-w-[30px] h-[36px] bg-[#3a3a3c] hover:bg-[#48484a] active:bg-[#636366] text-white text-[15px] font-medium rounded-[5px] flex items-center justify-center shadow-sm cursor-pointer transform active:scale-95 transition-all outline-none"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-[4px] px-2 w-full">
          {row2.map((char) => (
            <button
              key={char}
              id={`key-${char.toLowerCase()}`}
              onClick={() => handleKeyClick(char)}
              className="flex-1 max-w-[32px] h-[36px] bg-[#3a3a3c] hover:bg-[#48484a] active:bg-[#636366] text-white text-[15px] font-medium rounded-[5px] flex items-center justify-center shadow-sm cursor-pointer transform active:scale-95 transition-all outline-none"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-[4px] w-full items-center">
          {/* Shift representation dummy key */}
          <div className="flex-1 max-w-[34px] h-[36px] bg-[#2c2c2e] text-slate-450 rounded-[5px] flex items-center justify-center text-[10px] opacity-60">
            ⇧
          </div>

          {row3.map((char) => (
            <button
              key={char}
              id={`key-${char.toLowerCase()}`}
              onClick={() => handleKeyClick(char)}
              className="flex-1 max-w-[32px] h-[36px] bg-[#3a3a3c] hover:bg-[#48484a] active:bg-[#636366] text-white text-[15px] font-medium rounded-[5px] flex items-center justify-center shadow-sm cursor-pointer transform active:scale-95 transition-all outline-none"
            >
              {char}
            </button>
          ))}

          {/* Delete keycap */}
          <button
            onClick={onDelete}
            id="key-backspace"
            className="flex-1 max-w-[38px] h-[36px] bg-[#2c3e50]/80 hover:bg-[#34495e] active:bg-[#1abc9c] text-slate-200 rounded-[5px] flex items-center justify-center cursor-pointer transform active:scale-95 transition-all outline-none border border-slate-700/20"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Space, Numbers, Smiley, Return Row */}
        <div className="flex justify-between gap-[5px] w-full pt-0.5">
          {/* Mock Numbers Switch */}
          <button className="w-[45px] h-[38px] bg-[#2c2c2e] text-slate-300 text-[12px] rounded-[5px] flex items-center justify-center font-semibold">
            123
          </button>

          {/* Dummy Emoji Globe */}
          <button className="w-[32px] h-[38px] bg-[#2c2c2e] text-slate-300 text-[14px] rounded-[5px] flex items-center justify-center">
            ☺
          </button>

          {/* SPACE-BAR click-reactive */}
          <button
            onClick={() => handleKeyClick(" ")}
            id="key-spacebar"
            className="flex-1 h-[38px] bg-[#e5e5ea] hover:bg-white active:bg-slate-300 text-black text-[13px] rounded-[5px] flex items-center justify-center font-medium shadow-sm cursor-pointer transform active:scale-95 transition-all outline-none"
          >
            space
          </button>

          {/* Enter/Return keycap */}
          <button className="w-[60px] h-[38px] bg-slate-600/80 text-white text-[11px] rounded-[5px] flex items-center justify-center font-medium gap-0.5 border border-slate-500/20">
            <span>return</span>
            <CornerDownLeft className="w-3 h-3 text-slate-300" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
