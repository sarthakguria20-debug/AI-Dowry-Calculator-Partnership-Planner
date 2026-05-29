export interface ProfileData {
  gender: string;
  age: number;
  education: string;
  profession: string;
  income: number;
  assets: string[];
  quirks: string[];
  equalityAttitude: string;
  hobbies: string[];
}

export interface Metric {
  traitName: string;
  score: number; // 0 to 100
  description: string;
}

export interface CalculationResponse {
  title: string;
  dowryValue: string;
  valuationBreakdown: {
    humorCritique: string;
    strengthAnalysis: string[];
  };
  partnershipAdvice: string;
  recommendedVows: string[];
  characterTraitMetrics: Metric[];
}
