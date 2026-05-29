import React from "react";
import { ShieldAlert, BookOpen, Heart, Landmark, Users } from "lucide-react";

export const EducationalResources: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Visual Header Grid banner - Luxurious Gold Highlight Border */}
      <div className="bg-gradient-to-r from-[#1c1810] to-[#0c0d0f] rounded-3xl p-6 md:p-8 border border-[#b8860b]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#b8860b]/10 border border-[#b8860b]/30 text-[#b8860b] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> Warning: Dowry is Illegal
          </span>
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            Understanding the Legal & Social Reality
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The practice of dowry is a severe social offense prohibited under rigorous national laws. Marriage is an equal partner covenant, not a commercial transaction.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl shadow-lg flex items-center gap-4">
          <Landmark className="w-10 h-10 text-[#b8860b] flex-shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#b8860b]">Section 3 Penalty</p>
            <p className="text-sm font-semibold text-white font-serif">Min 5 Years Prison</p>
            <p className="text-[10px] text-gray-400">for giving, receiving, or requesting</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Anti-Dowry Legal Directory */}
        <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-5 shadow-2xl">
          <h4 className="font-serif font-bold text-white text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#b8860b]" /> Key Statutory Acts
          </h4>
          
          <div className="space-y-4 text-sm divide-y divide-white/5">
            <div className="space-y-1.5 pt-3 first:pt-0">
              <span className="text-xs font-mono font-bold text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/20 px-2.5 py-0.5 rounded">
                DPA 1961
              </span>
              <h5 className="font-serif font-semibold text-white mt-1">The Dowry Prohibition Act, 1961</h5>
              <p className="text-gray-400 text-xs leading-relaxed">
                Applies uniformly across jurisdictions. It makes the act of demanding, giving, or taking dowry completely illegal. Aggressors face severe criminal charges, asset confiscation, and mandatory imprisonment.
              </p>
            </div>

            <div className="space-y-1.5 pt-3">
              <span className="text-xs font-mono font-bold text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/20 px-2.5 py-0.5 rounded">
                IPC Section 498A
              </span>
              <h5 className="font-serif font-semibold text-white mt-1">Section 498A (Indian Penal Code)</h5>
              <p className="text-gray-400 text-xs leading-relaxed">
                Protects married women from physical, emotional, or economic harassment, abuse, or cruelty driven by lingering or initial dowry demands from spouses or in-laws. Offenses under this section are non-bailable.
              </p>
            </div>

            <div className="space-y-1.5 pt-3">
              <span className="text-xs font-mono font-bold text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/20 px-2.5 py-0.5 rounded">
                Section 304B
              </span>
              <h5 className="font-serif font-semibold text-white mt-1">Dowry Death Legislation</h5>
              <p className="text-gray-400 text-xs leading-relaxed">
                Establishes immediate legal presumption of guilt against in-laws if a partner suffers unexplained fatalities or injuries within 7 years of marriage tied directly to domestic harassment over unresolved demands.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats & Help Center */}
        <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[#b8860b]" /> Empowering Sociological Shifts
            </h4>

            {/* Quick Stats Bars */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">Generation wishing for absolute 50/50 division of chores</span>
                  <span className="text-[#b8860b] font-mono font-bold">92%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#b8860b] h-full rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">Couples managing finances jointly as dynamic equal teams</span>
                  <span className="text-[#b8860b] font-mono font-bold">81%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#c5a059] h-full rounded-full" style={{ width: "81%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">Young marriages actively rejecting historical gifting expectations</span>
                  <span className="text-[#b8860b] font-mono font-bold">87%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full rounded-full" style={{ width: "87%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Safe Helplines */}
          <div className="bg-white/5 rounded-2xl p-4 md:p-5 border border-white/10 space-y-3">
            <h5 className="text-xs font-bold font-serif uppercase tracking-widest text-[#b8860b] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Safe Helpline & Resources
            </h5>
            <p className="text-xs text-gray-300 leading-relaxed">
              If you or someone you know is undergoing societal pressure or harassment regarding dowry demands, please contact verified support desks immediately:
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 shadow-inner">
                <p className="text-[10px] font-mono text-gray-500">NATIONAL ALERTS</p>
                <p className="text-sm font-bold text-[#b8860b] font-serif">112 or 181</p>
                <p className="text-[10px] text-gray-400">24/7 Universal Emergency</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 shadow-inner">
                <p className="text-[10px] font-mono text-gray-500">WOMEN PROTECTION CELL</p>
                <p className="text-sm font-bold text-[#b8860b] font-serif">011-26944805</p>
                <p className="text-[10px] text-gray-400">NCW Redressal Desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
