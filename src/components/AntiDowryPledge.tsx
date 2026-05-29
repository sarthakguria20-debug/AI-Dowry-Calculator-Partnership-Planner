import React, { useRef, useState, useEffect } from "react";
import { Award, ShieldCheck, Download, RefreshCw, PenTool } from "lucide-react";

interface PledgeProps {
  userName: string;
}

export const AntiDowryPledge: React.FC<PledgeProps> = ({ userName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [sealColor, setSealColor] = useState("gold");

  // Initialize Canvas with Gold ink
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#b8860b"; // Gold ink matching theme
        ctx.lineWidth = 3.0;
        ctx.lineCap = "round";
      }
    }
  }, []);

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (e.type === "mousedown" || e.type === "touchstart") {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasSigned(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSigned(false);
    }
  };

  const triggerPrint = () => {
    window.print();
  };

  const currentDateString = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#b8860b]/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-xl mx-auto text-center mb-8 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#b8860b]/10 border border-[#b8860b]/20 text-[#b8860b] mb-3 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" /> SOCIAL COVENANT
        </span>
        <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
          Generate Marital Equality Certificate
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          Seal your pledge to mutual respect and financial transparency by signing your digital deed below.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
        {/* Sign Controls Block */}
        <div className="md:col-span-4 bg-white/5 rounded-2xl p-5 border border-white/10">
          <h4 className="font-serif font-semibold text-white text-sm mb-4 flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-[#b8860b]" /> Digital Endorsement
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-2">
                Selected Signature Seal
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSealColor("gold")}
                  className={`w-7 h-7 rounded-full bg-[#b8860b] border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    sealColor === "gold" ? "border-white scale-110" : "border-transparent opacity-60"
                  }`}
                  title="Golden Seal"
                  aria-label="Golden Seal"
                >
                  <span className="text-[8px] text-black font-extrabold">Au</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSealColor("bronze")}
                  className={`w-7 h-7 rounded-full bg-[#aa7c11] border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    sealColor === "bronze" ? "border-white scale-110" : "border-transparent opacity-60"
                  }`}
                  title="Bronze Seal"
                  aria-label="Bronze Seal"
                >
                  <span className="text-[8px] text-black font-extrabold">Bz</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSealColor("platinum")}
                  className={`w-7 h-7 rounded-full bg-slate-300 border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    sealColor === "platinum" ? "border-white scale-110" : "border-transparent opacity-60"
                  }`}
                  title="Platinum Seal"
                  aria-label="Platinum Seal"
                >
                  <span className="text-[8px] text-black font-extrabold">Pt</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1.5">
                Sign Below (Touch/Draw)
              </label>
              <div className="relative border border-white/10 rounded-xl bg-black/40 overflow-hidden h-28">
                <canvas
                  id="sig-canvas"
                  ref={canvasRef}
                  width={240}
                  height={110}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none"
                />
                {isDrawing && (
                  <span className="absolute bottom-1 right-2 text-[9px] font-mono text-[#b8860b]/50 pointer-events-none">
                    Engraving...
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={clearSignature}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#b8860b]" /> Clear Signature
              </button>
            </div>
            
            <p className="text-[11px] text-gray-400 leading-relaxed pt-2">
              Signing certifies advocacy against dowry transactions, affirming a commitment to an equal partnership model.
            </p>
          </div>
        </div>

        {/* Certificate Rendering Area */}
        <div id="print-area" className="md:col-span-8 flex flex-col items-center">
          <div
            className="w-full max-w-[500px] border-8 border-double border-[#b8860b] bg-gradient-to-br from-[#121418] to-[#0c0d0f] p-6 md:p-8 rounded-2xl relative shadow-2xl overflow-hidden aspect-[4/3] flex flex-col justify-between certificate-bg"
          >
            {/* Elegant Corner Borders */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#b8860b]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#b8860b]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#b8860b]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#b8860b]" />

            {/* Header */}
            <div className="text-center space-y-1">
              <div className="flex justify-center mb-1">
                <Award className={`w-10 h-10 ${
                  sealColor === "gold" ? "text-[#b8860b]" :
                  sealColor === "bronze" ? "text-[#aa7c11]" : "text-slate-300"
                }`} />
              </div>
              <h5 className="font-serif font-bold text-[15px] text-white uppercase tracking-widest">
                Certificate of Marital Autonomy
              </h5>
              <div className="h-[1px] w-32 bg-[#b8860b]/30 mx-auto" />
            </div>

            {/* Body */}
            <div className="text-center my-4 space-y-3">
              <p className="text-[11px] text-gray-400 italic">This document officially certifies that</p>
              <p className="font-serif text-xl font-bold text-[#b8860b] border-b border-dashed border-[#b8860b]/30 pb-1 max-w-xs mx-auto px-4 truncate">
                {userName || "A Priceless Partner"}
              </p>
              <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-sm mx-auto px-2">
                has pledged an indissoluble commitment to <span className="font-semibold text-white">Equal Marital Synergy</span>, having evaluated relationship parameters strictly on character, respect, capability, and shared chores, denouncing all outmoded custom exchanges.
              </p>
            </div>

            {/* Signatures & Seal Footer */}
            <div className="grid grid-cols-3 items-end gap-2 mt-4 pt-2 border-t border-white/10">
              <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase font-mono">Date Issued</p>
                <p className="text-[10px] font-semibold text-white font-mono mt-0.5">{currentDateString}</p>
              </div>

              {/* Dynamic Seal */}
              <div className="flex justify-center relative -top-2">
                <div className={`w-12 h-12 rounded-full border border-dashed flex items-center justify-center p-0.5 shadow-sm transition-colors duration-300 ${
                  sealColor === "gold" ? "bg-[#b8860b]/10 border-[#b8860b] text-[#b8860b]" :
                  sealColor === "bronze" ? "bg-[#aa7c11]/10 border-[#aa7c11] text-[#aa7c11]" :
                  "bg-white/10 border-slate-300 text-slate-300"
                }`}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-[7px] font-serif font-bold text-center uppercase leading-none border transition-colors ${
                    sealColor === "gold" ? "border-[#b8860b]/20 bg-[#b8860b]/20 text-[#b8860b]" :
                    sealColor === "bronze" ? "border-[#aa7c11]/20 bg-[#aa7c11]/20 text-[#aa7c11]" :
                    "border-white/10 bg-white/10 text-white"
                  }`}>
                    Priceless
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase font-mono">Endorsee Sig</p>
                <div className="h-6 flex items-center justify-center mt-0.5 border-b border-white/20 max-w-[90px] mx-auto overflow-hidden">
                  {hasSigned ? (
                    <span className="text-[10px] font-serif font-semibold text-[#b8860b] italic">
                      Signed Digitally
                    </span>
                  ) : (
                    <span className="text-[9px] text-gray-600 tracking-tight italic">
                      Awaiting...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center py-4 w-full">
            <button
              onClick={triggerPrint}
              disabled={!hasSigned}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md ${
                hasSigned
                  ? "bg-[#b8860b] hover:bg-[#9a7009] text-black cursor-pointer"
                  : "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Download className="w-3.5 h-3.5" /> Print / Share Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
