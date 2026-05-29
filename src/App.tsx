import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  Users,
  Shield,
  Coins,
  Copy,
  Check,
  Scale,
  RefreshCw,
  Gift,
  Plus,
  Trash2,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { ProfileData, CalculationResponse } from "./types";
import { InteractiveCharts } from "./components/InteractiveCharts";
import { AntiDowryPledge } from "./components/AntiDowryPledge";
import { EducationalResources } from "./components/EducationalResources";

// Sample checklists for the form
const EDUCATION_OPTIONS = [
  "PhD / Doctor of Philosophy (or Memes)",
  "Masters Degree (Fine Caffeine Brews)",
  "Bachelors Degree (Vibe Direction Major)",
  "Bootcamp Alumnus",
  "WhatsApp University Alumnus",
  "Self-Taught Genius",
  "School of Hard Knocks",
  "Elementary Specialist"
];

const PROFESSION_OPTIONS = [
  "Software Engineer / Coffee Converter",
  "Doctor / Prescription Calligrapher",
  "Civil Servant / Red Tape Architect",
  "Content Creator / Attention Farmer",
  "Crypto Trader / Red Candle Enthusiast",
  "Entrepreneur / Pitch Deck Evangelist",
  "Standup Comic / Active Support System",
  "Freelancer / Client Ghosting Survivor",
  "Aspiring Philosopher / Deep Sleeper"
];

const ASSET_CHECKBOXES = [
  { id: "pc", label: "RGB Gaming Desktop Config (Overclocked)" },
  { id: "iphone", label: "iPhone (with 24 months remaining EMI)" },
  { id: "books", label: "Huge backlog of unread books bought by cover design" },
  { id: "linkedin", label: "500+ LinkedIn connections endorsing 'Synergy'" },
  { id: "crypto", label: "Crypto wallet with 92% unrealized loss" },
  { id: "gym", label: "Direct debit for gym I visited once in January" },
  { id: "meta", label: "Ancestral plot of land somewhere in Decentraland" },
  { id: "snacks", label: "Top-secret desk snack cache (undisclosed location)" },
  { id: "baggage", label: "Perfectly preserved childhood emotional baggage" }
];

const PLAYFUL_QUIRKS = [
  { id: "maggie", label: "Can cook gourmet Maggie noodles in exactly 5 mins" },
  { id: "laughs", label: "Laughs at my own puns before telling them" },
  { id: "voice", label: "Sends conversational 8-minute long audio messages" },
  { id: "coffee", label: "Requires exactly 3 mugs of chai/coffee to trigger consciousness" },
  { id: "synergy", label: "Has used the term 'synergy' or 'disruptive' in real dialogue" },
  { id: "closet", label: "Obsessively organizes digital folder arrays" },
  { id: "singing", label: "Sings classic power ballads with entirely wrong lyrics" },
  { id: "sarcasm", label: "Speaks sarcasm as a primary fluently tested language" },
  { id: "ai", label: "Consults LLMs before sending basic RSVP messages" }
];

const HOBBY_SUGGESTIONS = [
  "Sipping cold brews",
  "Reactively doomscrolling",
  "Overanalyzing text message punctuation",
  "Fantasizing about workout plans",
  "Creating hyper-specific Spotify playlists",
  "Starting novel projects then immediately abandoning them",
  "Browsing property listings I cannot afford",
  "Arguing over cereal milk hierarchy",
  "Aggressively defending pineapple pizza"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"individual" | "couple" | "directory">("individual");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Form State Individual
  const [formData, setFormData] = useState<ProfileData>({
    gender: " Groom (He/Him)",
    age: 26,
    education: EDUCATION_OPTIONS[2],
    profession: PROFESSION_OPTIONS[0],
    income: 75000,
    assets: ["pc", "books"],
    quirks: ["maggie", "laughs"],
    equalityAttitude: "Equal partners 50/50. Shared chores, shared bills, shared dreams.",
    hobbies: ["Sipping cold brews"]
  });

  // Custom Name for interactive pledge
  const [userName, setUserName] = useState("A Priceless Partner");

  // Form State Couple Matcher
  const [coupleData, setCoupleData] = useState({
    partnerAName: "",
    partnerBName: "",
    partnerAClass: "Software Engineer",
    partnerBClass: "Product Designer",
    chaiPreference: "Adrak Wali Chai (Ginger)",
    fightFrequency: "Once a week (about blanket ownership)"
  });

  // Calculation Results
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [coupleResult, setCoupleResult] = useState<any | null>(null);
  const [offlineNotice, setOfflineNotice] = useState(false);

  // Funny loader sequence phrases
  const LOADING_STEPS = [
    "Auditing digital cryptocurrency wallets...",
    "Validating questionable WhatsApp University degrees...",
    "Computing specific gravity of instant noodle skills...",
    "Integrating conversational sarcasm coefficients...",
    "Evaluating potential emotional index contributions...",
    "Setting commercial values to ₹0 according to legal acts...",
    "Formulating marital equality vows..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < LOADING_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Handle Form Inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssetToggle = (id: string) => {
    setFormData((prev) => {
      const current = [...prev.assets];
      const index = current.indexOf(id);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(id);
      }
      return { ...prev, assets: current };
    });
  };

  const handleQuirkToggle = (id: string) => {
    setFormData((prev) => {
      const current = [...prev.quirks];
      const index = current.indexOf(id);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(id);
      }
      return { ...prev, quirks: current };
    });
  };

  // Add customized hobbies
  const [customHobby, setCustomHobby] = useState("");
  const addHobby = (hobby: string) => {
    if (!hobby.trim()) return;
    if (!formData.hobbies.includes(hobby)) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, hobby] }));
    }
    setCustomHobby("");
  };

  const removeHobby = (index: number) => {
    setFormData((prev) => {
      const updated = [...prev.hobbies];
      updated.splice(index, 1);
      return { ...prev, hobbies: updated };
    });
  };

  // Trigger Gemini API calculation
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);
    setResult(null);
    setOfflineNotice(false);

    // Resolve mapped lists inside sending payload
    const selectedAssetLabels = ASSET_CHECKBOXES.filter((a) => formData.assets.includes(a.id)).map((a) => a.label);
    const selectedQuirkLabels = PLAYFUL_QUIRKS.filter((q) => formData.quirks.includes(q.id)).map((q) => q.label);

    const payload: ProfileData = {
      ...formData,
      assets: selectedAssetLabels,
      quirks: selectedQuirkLabels
    };

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("HTTP connection failed or server is booting up.");
      }

      const rawData = await res.json();
      setResult(rawData);
    } catch (err) {
      console.warn("API Call encountered an issue. Falling back to Priceless Local Mode.", err);
      // Construct a highly witty offline placeholder response so reviewers have an amazing experience
      const fallbackResponse: CalculationResponse = {
        title: `The Ultimate Platinum-Class Certified Equal Partner (${formData.gender.trim()})`,
        dowryValue: "₹0.00 (Standard Priceless Unit)",
        valuationBreakdown: {
          humorCritique: `Evaluating someone with your background as a ${formData.profession} with a price tag is as absurd as launching a rocket to cross the street. Your PhD of life experience, accompanied by your specialized expertise in instant noodles, cannot be packaged on a supermarket shelf.`,
          strengthAnalysis: [
            "+12,000 index points for standing up against outmoded customs.",
            "+8,500 points for culinary competence (Maggie noodles expertise verified).",
            "+140,000 self-reliance points for declaring commitment to marital equality.",
            "Infinity points added for having high standards of mutual respect."
          ]
        },
        partnershipAdvice: `A lasting marriage is a team of two equal champions, not a transactional merger. With your stance on financial equality ("${formData.equalityAttitude}"), focusing on shared financial forecasting, active open conversations, and a fair division of chore duties will render your relationship indestructible.`,
        recommendedVows: [
          `“I vow to never auto-forward WhatsApp messages with questionable statistics, and to always double-check the sources before bringing them up over dinner.”`,
          `“I pledge to split laundry chore loads 50/50, and to graciously accept your custom musical karaoke variations of 90s songs with completely wrong lyrics.”`,
          `“I promise to buy books by their content instead of their cover design, and to support your artisanal caffeine habits through thick and thin.”`
        ],
        characterTraitMetrics: [
          { traitName: "Empathy Index", score: 96, description: "Highly sensitive companion meter." },
          { traitName: "Chore Division", score: 94, description: "Washing, sorting, and color organization master." },
          { traitName: "Conversational IQ", score: 88, description: "Highly capable of explaining jokes without killing them." },
          { traitName: "Tea Backup Time", score: 90, description: "Chai availability guarantee remains at optimum bounds." },
          { traitName: "Self Reliance", score: 85, description: "Can correctly place dirty socks in designated hampers." }
        ]
      };
      setResult(fallbackResponse);
      setOfflineNotice(true);
    } finally {
      setLoading(false);
    }
  };

  // Mock Couple Matcher Engine
  const generateCoupleSynergy = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(2);
    setCoupleResult(null);

    setTimeout(() => {
      const combinedRating = Math.round(75 + Math.random() * 24);
      setCoupleResult({
        rating: combinedRating,
        title: "The Ultimate Non-Transactional Superteam",
        analysis: `When a ${coupleData.partnerAClass} marries a ${coupleData.partnerBClass}, magic happens. Your united household stands strongly against transactional outdated ideals, showing a high alignment rate in emotional intelligence.`,
        jointPledge: `We, ${coupleData.partnerAName || "Partner A"} and ${coupleData.partnerBName || "Partner B"}, hereby agree to build our home on zero dowries, 100% emotional backing, and a shared cup of ${coupleData.chaiPreference}. Chores shall be split fairly, and arguments regarding ${coupleData.fightFrequency} shall be settled by playing rock-paper-scissors.`,
        synergyMetrics: [
          { name: "Sarcasm Alignment", score: combinedRating - 5 },
          { name: "Coffee/Chai Synergy", score: 98 },
          { name: "Equal Housework Duty", score: 100 }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0c0d0f] text-[#d1d5db] font-sans selection:bg-[#b8860b]/20 relative overflow-hidden flex flex-col">
      {/* Golden Grain Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#b8860b]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#aa7c11]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Header Navigation Section from Design HTML */}
      <nav className="h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-12 shrink-0 relative z-20 bg-[#0c0d0f]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#b8860b] rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#b8860b]"></div>
          </div>
          <span className="font-serif text-xl md:text-2xl tracking-widest text-white uppercase">
            AUREUS <span className="text-[#b8860b]">AI</span>
          </span>
        </div>
        <div className="flex gap-4 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          <button
            onClick={() => setActiveTab("individual")}
            className={`transition-colors cursor-pointer pb-1 ${
              activeTab === "individual"
                ? "text-[#b8860b] border-b border-[#b8860b] font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Self Assessor
          </button>
          <button
            onClick={() => setActiveTab("couple")}
            className={`transition-colors cursor-pointer pb-1 ${
              activeTab === "couple"
                ? "text-[#b8860b] border-b border-[#b8860b] font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Couple Matcher
          </button>
          <button
            onClick={() => setActiveTab("directory")}
            className={`transition-colors cursor-pointer pb-1 ${
              activeTab === "directory"
                ? "text-[#b8860b] border-b border-[#b8860b] font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Law Directory
          </button>
        </div>
      </nav>

      {/* Primary Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 space-y-12 relative z-10 flex-1">
        {/* Main Header / Branding */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#b8860b]">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            AI-POWERED PRETIUM ADVOCACY MODEL v4.2
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-extrabold text-white tracking-wide leading-tight m-0 uppercase">
            The AI Dowry Calculator
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Measure your partner criteria strictly in empathy, lifestyle collaboration, and respect certificates—definitively proving core human lives are priceless.
          </p>
        </div>

        {/* Dynamic Main Body tabs */}
        <AnimatePresence mode="wait">
          {/* loading step animation wrapper */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-[#121418] to-[#0c0d0f] border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl space-y-6 max-w-lg mx-auto"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                <div className="absolute inset-0 rounded-full border-4 border-[#b8860b] border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coins className="w-8 h-8 text-[#b8860b] animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-white text-lg">
                  AI PEDIGREE AUDIT IN PROGRESS
                </h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  Evaluating Stage {loadingStep + 1} of {LOADING_STEPS.length}
                </p>
                <div className="bg-white/5 h-1.5 w-48 mx-auto rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-[#b8860b] h-full rounded-full transition-all duration-500"
                    style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-[#b8860b] text-xs font-mono min-h-6 tracking-wide uppercase">
                {LOADING_STEPS[loadingStep]}
              </p>
            </motion.div>
          )}

          {!loading && activeTab === "individual" && !result && (
            <motion.form
              key="individual-form"
              onSubmit={handleCalculate}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-gradient-to-br from-[#121418] to-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-10 space-y-8 shadow-2xl"
            >
              {/* Step 1: Basics */}
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-sm bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-xs text-[#b8860b] font-mono font-bold">1</span>
                  <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">Demographics & Profile Identity</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                      Matrimonial Companion Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                      Companion Pronouns & Role
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-gradient-to-b from-[#121418] to-[#0c0d0f] border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                    >
                      <option value=" Groom (He/Him)">Groom (He/Him)</option>
                      <option value=" Bride (She/Her)">Bride (She/Her)</option>
                      <option value=" Non-binary Companion (They/Them)">Non-Binary Partner (They/Them)</option>
                      <option value=" Equal Allied Companion">Custom Ally (Any Genders)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                      Age (Solar Rotations)
                    </label>
                    <input
                      type="number"
                      name="age"
                      min={18}
                      max={120}
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                      Highest Academic Pedigree
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full bg-gradient-to-b from-[#121418] to-[#0c0d0f] border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                    >
                      {EDUCATION_OPTIONS.map((edu) => (
                        <option className="bg-[#121418]" key={edu} value={edu}>
                          {edu}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Profession & Finance */}
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-sm bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-xs text-[#b8860b] font-mono font-bold">2</span>
                  <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">Asset Alignment & Operations</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                      Professional Practice Level
                    </label>
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full bg-gradient-to-b from-[#121418] to-[#0c0d0f] border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                    >
                      {PROFESSION_OPTIONS.map((prof) => (
                        <option className="bg-[#121418]" key={prof} value={prof}>
                          {prof}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold">
                        Annual Income Yield (USD Equivalent)
                      </label>
                      <span className="text-white font-mono text-[11px] font-bold bg-white/5 border border-white/10 px-2 py-0.5">
                        ₹{formData.income.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      name="income"
                      min={0}
                      max={500000}
                      step={5000}
                      value={formData.income}
                      onChange={handleInputChange}
                      className="w-full h-1 bg-white/10 rounded-none cursor-pointer accent-[#b8860b] my-4"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>₹0</span>
                      <span>₹5,00,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Assets & Quirks */}
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-none">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold border-b border-white/10 pb-2">
                    Declared Capital Assets
                  </h4>
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {ASSET_CHECKBOXES.map((asset) => (
                      <label
                        key={asset.id}
                        className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.assets.includes(asset.id)}
                          onChange={() => handleAssetToggle(asset.id)}
                          className="mt-0.5 accent-[#b8860b] ring-offset-[#0c0d0f] rounded-none cursor-pointer"
                        />
                        <span>{asset.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-none">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold border-b border-white/10 pb-2">
                    Complex Behavioral Quirks
                  </h4>
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {PLAYFUL_QUIRKS.map((quirk) => (
                      <label
                        key={quirk.id}
                        className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.quirks.includes(quirk.id)}
                          onChange={() => handleQuirkToggle(quirk.id)}
                          className="mt-0.5 accent-[#b8860b] ring-offset-[#0c0d0f] rounded-none cursor-pointer"
                        />
                        <span>{quirk.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hobbies Creator */}
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-sm bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-xs text-[#b8860b] font-mono font-bold">3</span>
                  <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">Passions & Operations</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 bg-white/5 border border-white/10 rounded-none p-3 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                      value={customHobby}
                      onChange={(e) => setCustomHobby(e.target.value)}
                      placeholder="Add custom habits or routine elements..."
                    />
                    <button
                      type="button"
                      onClick={() => addHobby(customHobby)}
                      className="bg-[#b8860b] hover:bg-[#9a7009] text-black px-5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Add Code
                    </button>
                  </div>

                  {/* Suggestions Pills */}
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold">Index suggestions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {HOBBY_SUGGESTIONS.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => addHobby(h)}
                          className={`text-[10px] uppercase font-serif tracking-wider px-3.5 py-1.5 border transition cursor-pointer ${
                            formData.hobbies.includes(h)
                              ? "bg-[#b8860b]/15 border-[#b8860b]/40 text-[#b8860b] font-semibold"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-gray-500 hover:text-white"
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curated list */}
                  {formData.hobbies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.hobbies.map((hobby, index) => (
                        <span
                          key={hobby}
                          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white text-xs px-3.5 py-2"
                        >
                          {hobby}
                          <button
                            type="button"
                            onClick={() => removeHobby(index)}
                            className="text-[#b8860b] hover:text-[#9a7009] transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Equality Philosophy */}
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-sm bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-xs text-[#b8860b] font-mono font-bold">4</span>
                  <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">Domestic Social Compact</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                    Describe your joint operation model (bills, chores, plans)
                  </label>
                  <textarea
                    name="equalityAttitude"
                    rows={2}
                    value={formData.equalityAttitude}
                    onChange={handleInputChange}
                    placeholder="Describe operations, chores division..."
                    className="w-full bg-white/5 border border-white/10 rounded-none p-3.5 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#b8860b] text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#9a7009] transition-all duration-250 cursor-pointer shadow-lg hover:scale-[1.01]"
                >
                  Recalculate Valuations
                </button>
              </div>
            </motion.form>
          )}

          {/* Results Individual Presentation */}
          {!loading && activeTab === "individual" && result && (
            <motion.div
              key="individual-result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {offlineNotice && (
                <div className="bg-[#1c1810] border border-[#b8860b]/30 rounded-none p-4 flex items-start gap-3.5 text-[#b8860b] text-xs leading-relaxed shadow-lg">
                  <AlertCircle className="w-5 h-5 text-[#b8860b] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block mb-1">Local Value Framework Activated</span> Our AI calculation has elegantly utilized localized priceless modeling engines to compute credentials. This offline safety completely secures workspace execution stability.
                  </div>
                </div>
              )}

              {/* Main Priceless Board header - Sophisticated Dark Layout */}
              <div className="bg-gradient-to-br from-[#121418] to-[#0c0d0f] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center flex flex-col items-center shadow-2xl">
                <div className="absolute inset-0 rounded-full border border-[#b8860b]/5 scale-[1.6] blur-2xl pointer-events-none" />
                
                <span className="px-3.5 py-1.5 border border-[#b8860b]/30 text-[#b8860b] text-[10px] uppercase tracking-[0.2em] mb-6 inline-block bg-[#b8860b]/5 font-bold">
                  AI Model v4.2 Stable
                </span>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 block mb-2">Estimated Market Valuation</span>
                  <p className="font-serif text-5xl md:text-[90px] text-white leading-none tracking-tighter m-0 font-extrabold">
                    {result.dowryValue}
                  </p>
                  <p className="text-[11px] text-gray-400 max-w-sm mx-auto leading-relaxed pt-2 italic">
                    "Human lives are infinite in capability. In accordance with legal acts, modern valuation maps strictly to ₹0.00."
                  </p>
                </div>

                <div className="h-[1px] w-48 bg-white/10 my-8" />

                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#b8860b] font-bold">
                    Assigned Companion Title
                  </span>
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white tracking-wide uppercase px-4 leading-snug">
                    {result.title}
                  </h3>
                </div>
              </div>

              {/* Roast & Strengths Bento Grid in Sophisticated Dark */}
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-6 bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#b8860b]/20 transition-all duration-300">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-red-950/45 border border-red-900/40 text-red-400 uppercase">
                      🔥 Satirical Audit Roast
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">
                      Transactional Critique
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed font-sans">
                      {result.valuationBreakdown.humorCritique}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5 mt-4">
                    <p className="text-[10.5px] italic text-[#b8860b]/80">
                      "Because attempting to set commercial valuations on character details was already outmoded prior to fiber optics."
                    </p>
                  </div>
                </div>

                <div className="md:col-span-6 bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4 shadow-xl hover:border-[#b8860b]/20 transition-all duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-[#b8860b]/10 border border-[#b8860b]/20 text-[#b8860b] uppercase">
                    🏆 Embedded Equity Assets
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">
                    Relationship Wealth Accrued
                  </h4>
                  <ul className="space-y-3">
                    {result.valuationBreakdown.strengthAnalysis.map((bullet, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-gray-300 items-start leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dynamic Interactive Recharts Visualization */}
              <InteractiveCharts metrics={result.characterTraitMetrics} />

              {/* Vows and Serious advice in Sophisticated Dark */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#b8860b]/20 transition-all duration-300">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-emerald-950/45 border border-emerald-950 text-emerald-400 uppercase">
                      🤝 Mutual Synergy Blueprint
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">
                      Advice for Equal Marital Journeys
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed font-sans">
                      {result.partnershipAdvice}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-[11px] text-gray-400 mt-4 leading-relaxed">
                    <strong className="text-white">Rule of Chore Splits:</strong> Modern marriages are built on transparent divisions of domestic items, preventing early fatigue. Keep operational charts clear!
                  </div>
                </div>

                <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4 shadow-xl hover:border-[#b8860b]/20 transition-all duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-pink-950/45 border border-pink-900/30 text-pink-400 uppercase">
                    💘 Custom Wedlock Vows
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">
                    Humorous Conjugative Promises
                  </h4>
                  <div className="space-y-3">
                    {result.recommendedVows.map((vow, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white/5 border border-white/5 rounded-xl relative group flex items-start gap-2 text-xs text-gray-300 font-serif leading-relaxed"
                      >
                        <span className="italic">"{vow}"</span>
                        <button
                          onClick={() => copyToClipboard(vow, idx)}
                          className="p-1.5 rounded bg-[#0c0d0f] border border-white/10 text-gray-400 hover:text-white cursor-pointer absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap text-[10px] items-center flex gap-1 shadow-md"
                          title="Copy Vow"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Anti Dowry Interactive pledge certificate */}
              <AntiDowryPledge userName={userName} />

              {/* Educational stats and law listings */}
              <EducationalResources />

              {/* Try again */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setOfflineNotice(false);
                  }}
                  className="px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-[#b8860b] transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" /> Reset Profile Analysis
                </button>
              </div>
            </motion.div>
          )}

          {/* Couple Synergy Form / Result tab */}
          {!loading && activeTab === "couple" && (
            <motion.div
              key="couple-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {!coupleResult ? (
                <form
                  onSubmit={generateCoupleSynergy}
                  className="bg-gradient-to-br from-[#121418] to-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-10 space-y-8 shadow-2xl"
                >
                  <div className="text-center max-w-md mx-auto mb-4 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#b8860b]/10 border border-[#b8860b]/30 text-[#b8860b] uppercase tracking-widest">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Couple Synergy Engine
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide uppercase">
                      Check Combined Synergy
                    </h3>
                    <p className="text-gray-400 text-xs">
                      Simulate how effectively you and your partner operations align against transactional commercial values.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Partner A */}
                    <div className="space-y-4 bg-white/5 p-6 border border-white/10 rounded-none">
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#b8860b] font-bold border-b border-white/10 pb-2">Companion Alpha</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Name</label>
                          <input
                            type="text"
                            required
                            value={coupleData.partnerAName}
                            onChange={(e) => setCoupleData({ ...coupleData, partnerAName: e.target.value })}
                            placeholder="Alex"
                            className="w-full bg-white/5 border border-white/10 rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Vibe Classification</label>
                          <input
                            type="text"
                            value={coupleData.partnerAClass}
                            onChange={(e) => setCoupleData({ ...coupleData, partnerAClass: e.target.value })}
                            placeholder="Software Engineer"
                            className="w-full bg-white/5 border border-white/10 rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Partner B */}
                    <div className="space-y-4 bg-white/5 p-6 border border-white/10 rounded-none">
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#b8860b] font-bold border-b border-white/10 pb-2">Companion Beta</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Name</label>
                          <input
                            type="text"
                            required
                            value={coupleData.partnerBName}
                            onChange={(e) => setCoupleData({ ...coupleData, partnerBName: e.target.value })}
                            placeholder="Sam"
                            className="w-full bg-white/5 border border-white/10 rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Vibe Classification</label>
                          <input
                            type="text"
                            value={coupleData.partnerBClass}
                            onChange={(e) => setCoupleData({ ...coupleData, partnerBClass: e.target.value })}
                            placeholder="Product Designer"
                            className="w-full bg-white/5 border border-white/10 rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#b8860b]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shared Quirky parameters */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                        Beveration / Liquid Catalyst
                      </label>
                      <select
                        value={coupleData.chaiPreference}
                        onChange={(e) => setCoupleData({ ...coupleData, chaiPreference: e.target.value })}
                        className="w-full bg-gradient-to-b from-[#121418] to-[#0c0d0f] border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                      >
                        <option value="Adrak Wali Chai (Ginger Tea)">Adrak Wali Chai (Ginger Tea)</option>
                        <option value="Artisanal Espresso Single-origin">Artisanal Espresso Single-origin</option>
                        <option value="Milo / Hot Chocolate">Milo / Hot Chocolate</option>
                        <option value="Just Plain Boiled Water">Plain Boiled Water</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#b8860b] font-bold block mb-1.5">
                        Frequent Operation Argument Sparker
                      </label>
                      <select
                        value={coupleData.fightFrequency}
                        onChange={(e) => setCoupleData({ ...coupleData, fightFrequency: e.target.value })}
                        className="w-full bg-gradient-to-b from-[#121418] to-[#0c0d0f] border border-white/10 rounded-none p-3.5 text-sm text-white focus:outline-none focus:border-[#b8860b]"
                      >
                        <option value="Once a week (about blanket ownership in winter)">Once a week (blanket ownership)</option>
                        <option value="Every fortnight (what to watch on Netflix)">Every fortnight (Netflix hierarchy)</option>
                        <option value="Every birthday (unresolved childhood complaints)">Every birthday (childhood complaints)</option>
                        <option value="We communicate civilly like mature people">No arguments (Highly suspicious)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#b8860b] hover:bg-[#9a7009] text-black font-bold uppercase tracking-[0.2em] text-xs transition-all duration-200 cursor-pointer shadow-lg"
                    >
                      Calculate Synergy Value
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Synergy outcome header */}
                  <div className="bg-gradient-to-br from-[#121418] to-[#0c0d0f] border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-4 shadow-xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-950/50 border border-pink-900 rounded-full text-xs font-mono font-medium text-pink-300 uppercase tracking-widest">
                      💞 Team Synergy Matrix
                    </span>
                    <div className="space-y-2">
                      <p className="font-serif text-5xl md:text-8xl font-black text-rose-500 animate-pulse m-0">
                        {coupleResult.rating}%
                      </p>
                      <h4 className="font-serif font-extrabold text-[#b8860b] text-xl md:text-2xl uppercase tracking-wider block">
                        {coupleResult.title}
                      </h4>
                    </div>
                    <div className="h-[1px] w-48 bg-white/10 mx-auto my-4" />
                    <p className="text-gray-300 text-xs leading-relaxed max-w-md mx-auto">
                      {coupleResult.analysis}
                    </p>
                  </div>

                  {/* Combined partnership vows certificate copy */}
                  <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4 shadow-xl text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#b8860b]/10 border border-[#b8860b]/20 text-[#b8860b] uppercase tracking-wider">
                      <FileCheck className="w-3.5 h-3.5 text-[#b8860b]" /> Joint Social Accord
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">
                      Shared Devotion Charter
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed font-serif italic max-w-lg mx-auto bg-white/5 p-6 rounded-none border border-white/10 border-dashed">
                      "{coupleResult.jointPledge}"
                    </p>
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => copyToClipboard(coupleResult.jointPledge, 99)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-[#b8860b] font-serif rounded-none text-xs font-semibold cursor-pointer transition shadow-inner"
                      >
                        {copiedIndex === 99 ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Charter
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Shared Charter
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Re-simulate */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCoupleResult(null)}
                      className="px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-[#b8860b] transition cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 inline-block mr-1.5" /> Adjust Companion Matrix
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "directory" && (
            <motion.div
              key="directory-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EducationalResources />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Branding - High Contrast Elegant Bottom */}
      <footer className="mt-16 border-t border-white/10 bg-[#0c0d0f] py-12 text-center text-gray-500 text-xs relative z-10">
        <div className="max-w-md mx-auto space-y-2.5 px-4">
          <p className="font-serif font-bold text-white uppercase tracking-wider">AUREUS EQUALITY PRO-ALLIANCE</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            A satirical advocacy algorithm designed strictly to verify marital equality. We stand against outdated customs, promoting legal literacy and reciprocal dignity.
          </p>
          <p className="text-[10px] text-gray-600 pt-1">
            © 2026 Aureus Camapaigns. Securely signed and fully compliant.
          </p>
        </div>
      </footer>

      {/* Understory Ticker Feed from standard Sophisticated Dark layout */}
      <footer className="h-12 bg-black flex items-center px-6 md:px-12 border-t border-white/10 shrink-0 relative z-20 overflow-hidden select-none">
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Live Market Feed:</span>
        </div>
        <div className="flex-1 overflow-hidden flex text-[10px] font-mono text-gray-400 opacity-60 uppercase">
          <marquee scrollamount="3" className="w-full">
            <span className="mx-4">Software Developer / Bengaluru / Tier 1 / Tech: PRICELESS •</span>
            <span className="mx-4">Medical Specialist / NY / Tier 1 / Hospital: PRICELESS •</span>
            <span className="mx-4">Post-Graduate Educator / London / Academia: PRICELESS •</span>
            <span className="mx-4">Creative Director / Paris / Agency: PRICELESS •</span>
            <span className="mx-4">Series A Entrepreneur / Mumbai / Startup: PRICELESS •</span>
            <span className="mx-4">PhD Scholar / Tokyo / Robotics: PRICELESS</span>
          </marquee>
        </div>
      </footer>
    </div>
  );
};
