import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { ProfileData } from "./src/types.js"; // Note: .js extension is safer or can omit in ESM/TS

// Load environment variables
dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const PORT = 3000;

// Lazy initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function main() {
  const app = express();
  app.use(express.json());

  // API Status Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Main Satirical Calculation Endpoint
  app.post("/api/calculate", async (req, res) => {
    try {
      const profile: ProfileData = req.body;
      
      // Basic input validation
      if (!profile || !profile.gender || !profile.profession) {
        return res.status(400).json({ error: "Invalid profile data. Please fill in all required fields." });
      }

      // Initialize API client
      const ai = getGeminiClient();

      const prompt = `
You are a highly witty, satirical, yet deeply socially conscious AI analyst and counselor. Your task is to analyze the following matrimonial/partnership profile and generate a satirical "AI Dowry & Equality Value" assessment.

CRITICAL DIRECTIVES:
1. **DOWRY IS ZERO ALWAYS**: The calculated "dowryValue" MUST strictly reflect ₹0 (or a funny satirical representation such as "Exactly ₹0.00 / $0.00"). You must emphasize that human beings are priceless and cannot be commodified, bought, or traded. Dowry is legal, dangerous offense, and socially toxic. Explicitly state the complete lack of financial transactions and replace it with values of joint equal partnership.
2. **SPICY & SOUTH ASIAN/GLOBAL SATIRE**: Infuse relevant witty references. Roast their quirks, profession, or education with sweet sarcasm (e.g. engineers running on caffeine, WhatsApp University degrees, gym obsessions, high-priced crypto portfolios, ability to cook only instant noodles, or family group expectation).
3. **CONSTRUCTIVE ROADMAP FOR EQUAL PARTNERSHIP**: Offer serious and beautiful thoughts on marriage being a 50-50, empathetic union with a chore division quotient and shared dreams.
4. **PERSONALIZED**: Refer directly to assets: ${profile.assets.join(", ")}, quirks: ${profile.quirks.join(", ")}, income: ${profile.income}, and hobbies: ${profile.hobbies.join(", ")}.

Profile to Analyze:
- Gender/Role: ${profile.gender}
- Age: ${profile.age}
- Education: ${profile.education}
- Profession: ${profile.profession}
- Monthly Income Index: INR ${profile.income} / month
- Claimed Assets: ${profile.assets.length > 0 ? profile.assets.join(", ") : "None declared"}
- Personal Quirks: ${profile.quirks.length > 0 ? profile.quirks.join(", ") : "Vanilla person (no quirks)"}
- Declared attitude towards marital equality: ${profile.equalityAttitude}
- Passions/Hobbies: ${profile.hobbies.length > 0 ? profile.hobbies.join(", ") : "None declared"}

Generate a delightful JSON response matching the requested schema. Ensure all fields are filled.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A satirical, high-society title or humorous label assigned to this user profile based on their inputs."
              },
              dowryValue: {
                type: Type.STRING,
                description: "This must ALWAYS be ₹0 (Priceless & Illegal) or similar, celebrating human dignity. Make it humorous and educational."
              },
              valuationBreakdown: {
                type: Type.OBJECT,
                properties: {
                  humorCritique: {
                    type: Type.STRING,
                    description: "A funny and direct satirical roasting/roast-critique of the profile (2-3 sentences), explaining why matching their profession/salary to a value is ridiculous."
                  },
                  strengthAnalysis: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-5 bullet points of actual 'priceless' intangible strengths based on their quirks or profession, stating points added (e.g. '+5000 points for actually knowing how to cook edible curry')."
                  }
                },
                required: ["humorCritique", "strengthAnalysis"]
              },
              partnershipAdvice: {
                type: Type.STRING,
                description: "A warm, genuine, serious piece of advice (3-4 sentences) about how they can build an equal-partnership marital or life journey with absolute respect, emotional synergy, and equal shared responsibilities."
              },
              recommendedVows: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 custom humorous, relatable marriage/partnership vows customized directly to their hobbies and quirks."
              },
              characterTraitMetrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    traitName: { type: Type.STRING, description: "Name of the actual metric such as 'Meme Compatibility', 'Emotional Intelligence', 'Chore Equality', 'Independence', 'Coffee/Tea Support'" },
                    score: { type: Type.INTEGER, description: "A score from 0 to 100 representing how well the profile performs in this area based on inputs." },
                    description: { type: Type.STRING, description: "A short, funny tagline justifying the score." }
                  },
                  required: ["traitName", "score", "description"]
                },
                description: "Exactly 5 different character trait metrics representing healthy marriage value metrics (e.g., Emotional Intelligence, Chore Division Quotient, financial sanity)."
              }
            },
            required: ["title", "dowryValue", "valuationBreakdown", "partnershipAdvice", "recommendedVows", "characterTraitMetrics"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Unable to obtain a response from Gemini.");
      }

      const calculatedResult = JSON.parse(responseText.trim());
      res.json(calculatedResult);
    } catch (error: any) {
      console.error("Calculation Error:", error);
      res.status(500).json({ 
        error: error.message || "Something went wrong while generating assessment. Please verify your GEMINI_API_KEY is configured." 
      });
    }
  });

  // Setup Vite Dev server middleware or serve production static assets
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Dowry Calculator server booted in ${isProd ? "production" : "development"} mode on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
