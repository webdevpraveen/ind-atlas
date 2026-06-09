export interface StateProfile {
  name: string;
  instabilityIndex: number;
  resilienceScore: number;
  breakdown: { unrest: number; conflict: number; military: number; info: number; };
  categories: { economic: number; infra: number; energy: number; social: number; health: number; recovery: number; };
  brief: { situation: string; risks: string[]; outlook24h: string; };
  energy: { coal: number; renewable: number; nuclear: number; demandTWh: string; };
  signals: { displaced: string; jamming: number; };
  facts: { population: string; capital: string; area: string; languages: string; cm: string; literacy: string; gdp: string; };
  sources: { demographics: string; economy: string; intel: string; };
}

const REAL_STATE_DATA: Record<string, any> = {
  "Andhra Pradesh": { capital: "Amaravati", pop: "49.5M", area: "162,975 km²", lang: "Telugu", cm: "N. Chandrababu Naidu", lit: "67.0%", gdp: "$160B" },
  "Arunachal Pradesh": { capital: "Itanagar", pop: "1.4M", area: "83,743 km²", lang: "English", cm: "Pema Khandu", lit: "65.4%", gdp: "$4B" },
  "Assam": { capital: "Dispur", pop: "31.2M", area: "78,438 km²", lang: "Assamese", cm: "Himanta Biswa Sarma", lit: "72.2%", gdp: "$60B" },
  "Bihar": { capital: "Patna", pop: "104.1M", area: "94,163 km²", lang: "Hindi", cm: "Nitish Kumar", lit: "61.8%", gdp: "$95B" },
  "Chhattisgarh": { capital: "Raipur", pop: "25.5M", area: "135,192 km²", lang: "Hindi", cm: "Vishnu Deo Sai", lit: "70.3%", gdp: "$55B" },
  "Goa": { capital: "Panaji", pop: "1.5M", area: "3,702 km²", lang: "Konkani", cm: "Pramod Sawant", lit: "88.7%", gdp: "$11B" },
  "Gujarat": { capital: "Gandhinagar", pop: "60.4M", area: "196,024 km²", lang: "Gujarati", cm: "Bhupendrabhai Patel", lit: "78.0%", gdp: "$280B" },
  "Haryana": { capital: "Chandigarh", pop: "25.4M", area: "44,212 km²", lang: "Hindi", cm: "Nayab Singh Saini", lit: "75.6%", gdp: "$120B" },
  "Himachal Pradesh": { capital: "Shimla", pop: "6.8M", area: "55,673 km²", lang: "Hindi", cm: "Sukhvinder Singh Sukhu", lit: "82.8%", gdp: "$24B" },
  "Jharkhand": { capital: "Ranchi", pop: "32.9M", area: "79,716 km²", lang: "Hindi", cm: "Hemant Soren", lit: "66.4%", gdp: "$48B" },
  "Karnataka": { capital: "Bengaluru", pop: "61.1M", area: "191,791 km²", lang: "Kannada", cm: "Siddaramaiah", lit: "75.4%", gdp: "$260B" },
  "Kerala": { capital: "Thiruvananthapuram", pop: "33.4M", area: "38,863 km²", lang: "Malayalam", cm: "Pinarayi Vijayan", lit: "94.0%", gdp: "$130B" },
  "Madhya Pradesh": { capital: "Bhopal", pop: "72.6M", area: "308,252 km²", lang: "Hindi", cm: "Mohan Yadav", lit: "69.3%", gdp: "$150B" },
  "Maharashtra": { capital: "Mumbai", pop: "112.4M", area: "307,713 km²", lang: "Marathi", cm: "Eknath Shinde", lit: "82.3%", gdp: "$430B" },
  "Manipur": { capital: "Imphal", pop: "2.8M", area: "22,327 km²", lang: "Meitei", cm: "N. Biren Singh", lit: "76.9%", gdp: "$4.5B" },
  "Meghalaya": { capital: "Shillong", pop: "2.9M", area: "22,429 km²", lang: "English", cm: "Conrad Sangma", lit: "74.4%", gdp: "$5B" },
  "Mizoram": { capital: "Aizawl", pop: "1.0M", area: "21,081 km²", lang: "Mizo, English", cm: "Lalduhoma", lit: "91.3%", gdp: "$3.5B" },
  "Nagaland": { capital: "Kohima", pop: "1.9M", area: "16,579 km²", lang: "English", cm: "Neiphiu Rio", lit: "79.6%", gdp: "$4B" },
  "Odisha": { capital: "Bhubaneswar", pop: "41.9M", area: "155,707 km²", lang: "Odia", cm: "Mohan Charan Majhi", lit: "72.9%", gdp: "$95B" },
  "Punjab": { capital: "Chandigarh", pop: "27.7M", area: "50,362 km²", lang: "Punjabi", cm: "Bhagwant Mann", lit: "75.8%", gdp: "$85B" },
  "Rajasthan": { capital: "Jaipur", pop: "68.5M", area: "342,239 km²", lang: "Hindi", cm: "Bhajan Lal Sharma", lit: "66.1%", gdp: "$160B" },
  "Sikkim": { capital: "Gangtok", pop: "0.6M", area: "7,096 km²", lang: "English", cm: "Prem Singh Tamang", lit: "81.4%", gdp: "$4.5B" },
  "Tamil Nadu": { capital: "Chennai", pop: "72.1M", area: "130,058 km²", lang: "Tamil", cm: "M. K. Stalin", lit: "80.1%", gdp: "$300B" },
  "Telangana": { capital: "Hyderabad", pop: "35.0M", area: "112,077 km²", lang: "Telugu", cm: "A. Revanth Reddy", lit: "66.5%", gdp: "$160B" },
  "Tripura": { capital: "Agartala", pop: "3.6M", area: "10,491 km²", lang: "Bengali", cm: "Manik Saha", lit: "87.2%", gdp: "$8B" },
  "Uttar Pradesh": { capital: "Lucknow", pop: "199.8M", area: "240,928 km²", lang: "Hindi", cm: "Yogi Adityanath", lit: "67.7%", gdp: "$270B" },
  "Uttarakhand": { capital: "Dehradun", pop: "10.0M", area: "53,483 km²", lang: "Hindi", cm: "Pushkar Singh Dhami", lit: "78.8%", gdp: "$35B" },
  "West Bengal": { capital: "Kolkata", pop: "91.2M", area: "88,752 km²", lang: "Bengali", cm: "Mamata Banerjee", lit: "76.3%", gdp: "$200B" },
  "Delhi": { capital: "New Delhi", pop: "16.7M", area: "1,484 km²", lang: "Hindi", cm: "Arvind Kejriwal", lit: "86.2%", gdp: "$110B" },
  "Jammu and Kashmir": { capital: "Srinagar/Jammu", pop: "12.2M", area: "42,241 km²", lang: "Urdu", cm: "Vacant (President's Rule)", lit: "67.2%", gdp: "$25B" },
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export function getStateProfile(stateName: string): StateProfile {
  const key = Object.keys(REAL_STATE_DATA).find(k => k.toLowerCase() === stateName.toLowerCase());
  const data = key ? REAL_STATE_DATA[key] : { capital: "N/A", pop: "N/A", area: "N/A", lang: "N/A", cm: "N/A", lit: "N/A", gdp: "N/A" };
  const hash = hashString(key || stateName);
  
  const rM = (min: number, max: number, salt: number = 0) => Math.floor(((hash + salt) % (max - min + 1)) + min);

  return {
    name: key || stateName,
    instabilityIndex: rM(10, 60, 1),
    resilienceScore: rM(50, 95, 2),
    breakdown: {
      unrest: rM(0, 30, 3), conflict: rM(0, 20, 4), military: rM(10, 50, 5), info: rM(5, 40, 6)
    },
    categories: {
      economic: rM(60, 95, 7), infra: rM(50, 90, 8), energy: rM(70, 98, 9), social: rM(55, 85, 10), health: rM(45, 88, 11), recovery: rM(60, 90, 12)
    },
    brief: {
      situation: `${key || stateName} is currently exhibiting normal operational parameters. State law enforcement and central agencies maintain standard readiness. Composite Infrastructure Index remains stable across major urban centers.`,
      risks: [
        "Standard cyber-reconnaissance probing detected on state data centers.",
        "Minor logistical bottlenecks expected in high-density commercial zones.",
        "Seasonal weather anomalies may stress local agricultural supply chains."
      ],
      outlook24h: "Stable outlook. Continue standard threat monitoring."
    },
    energy: {
      coal: rM(40, 80, 16), renewable: rM(10, 40, 17), nuclear: rM(0, 10, 18), demandTWh: `${rM(50, 200, 19)}.${rM(1, 9, 20)}`
    },
    signals: {
      displaced: `${rM(1, 10, 21)}K`, jamming: rM(0, 2, 22)
    },
    facts: {
      population: data.pop, capital: data.capital, area: data.area, languages: data.lang, cm: data.cm, literacy: data.lit, gdp: data.gdp
    },
    sources: {
      demographics: "Source: Census of India 2011 / MHA",
      economy: "Source: Ministry of Statistics & RBI",
      intel: "Aggregated OSINT & Media Sentiment Analysis (Real-time simulation)"
    }
  };
}
