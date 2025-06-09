export const crashEvents = [
  {
    id: 1,
    name: "Black Tuesday",
    date: "1929-10-29",
    severity: "Extreme",
    impact: "-12.8% in one day",
    description:
      "The most devastating stock market crash in U.S. history, marking the beginning of the Great Depression. Panic selling led to massive losses.",
    recovery: "Took 25 years to recover to pre-crash levels",
  },
  {
    id: 2,
    name: "Black Monday",
    date: "1987-10-19",
    severity: "Extreme",
    impact: "-22.6% in one day",
    description:
      "The largest single-day percentage decline in stock market history. Caused by program trading and portfolio insurance strategies.",
    recovery: "Recovered within 2 years",
  },
  {
    id: 3,
    name: "Dot-com Crash",
    date: "2000-03-10",
    severity: "High",
    impact: "-78% peak to trough",
    description:
      "The collapse of internet and technology stocks after years of speculation. Many dot-com companies went bankrupt.",
    recovery: "Took 7 years to reach new highs",
  },
  {
    id: 4,
    name: "9/11 Attacks",
    date: "2001-09-17",
    severity: "High",
    impact: "-14.3% in one week",
    description:
      "Markets closed for 4 days after the terrorist attacks. When reopened, massive selling occurred due to uncertainty.",
    recovery: "Recovered within 1 month",
  },
  {
    id: 5,
    name: "Financial Crisis",
    date: "2008-09-29",
    severity: "Extreme",
    impact: "-54% peak to trough",
    description:
      "Subprime mortgage crisis led to the collapse of major financial institutions. Lehman Brothers bankruptcy triggered global panic.",
    recovery: "Took 5 years to reach new highs",
  },
  {
    id: 6,
    name: "Flash Crash",
    date: "2010-05-06",
    severity: "Medium",
    impact: "-9% in minutes",
    description:
      "High-frequency trading algorithms caused a rapid market crash and recovery within minutes. Highlighted market fragility.",
    recovery: "Recovered same day",
  },
  {
    id: 7,
    name: "COVID-19 Crash",
    date: "2020-03-16",
    severity: "High",
    impact: "-37% in 5 weeks",
    description:
      "Global pandemic fears led to the fastest bear market in history. Unprecedented government intervention followed.",
    recovery: "Recovered within 5 months",
  },
  {
    id: 8,
    name: "The Great Shockwave",
    date: "2026-08-15",
    severity: "Extreme",
    impact: "Projected -60% decline",
    description:
      "Predicted major market correction based on Elliott Wave analysis. Expected to be triggered by debt crisis and geopolitical tensions.",
    recovery: "Estimated 3-7 years for full recovery",
  },
]

export const elliottWaves = [
  {
    id: 1,
    date: "1932-07-08",
    degree: "Grand Supercycle",
    type: "Trough",
    label: "GSC IV",
    confidence: "High",
    description: "Grand Supercycle Wave IV bottom during Great Depression",
  },
  {
    id: 2,
    date: "2000-01-14",
    degree: "Supercycle",
    type: "Peak",
    label: "SC III",
    confidence: "High",
    description: "Supercycle Wave III top at dot-com peak",
  },
  {
    id: 3,
    date: "2009-03-09",
    degree: "Cycle",
    type: "Trough",
    label: "C A",
    confidence: "High",
    description: "Cycle Wave A bottom during financial crisis",
  },
  {
    id: 4,
    date: "2021-11-08",
    degree: "Primary",
    type: "Peak",
    label: "P 5",
    confidence: "Medium",
    description: "Primary Wave 5 potential top",
  },
  {
    id: 5,
    date: "2022-10-12",
    degree: "Intermediate",
    type: "Trough",
    label: "I 2",
    confidence: "Medium",
    description: "Intermediate Wave 2 correction",
  },
  {
    id: 6,
    date: "2024-03-15",
    degree: "Minor",
    type: "Peak",
    label: "m 3",
    confidence: "Low",
    description: "Minor Wave 3 extension",
  },
  {
    id: 7,
    date: "2026-08-15",
    degree: "Supercycle",
    type: "Trough",
    label: "SC IV",
    confidence: "Projection",
    description: "Projected Supercycle Wave IV major correction",
  },
  {
    id: 8,
    date: "2030-12-31",
    degree: "Grand Supercycle",
    type: "Peak",
    label: "GSC V",
    confidence: "Projection",
    description: "Projected Grand Supercycle Wave V completion",
  },
]

export const historicalData = [
  { date: "1896-05-26", open: 28, high: 29, low: 28, close: 28.89, volume: 0 }, // Correcte start waarde
  { date: "1900-01-01", open: 68, high: 71, low: 52, close: 66.08, volume: 0 },
  { date: "1910-01-01", open: 81, high: 100, low: 53, close: 81.36, volume: 0 },
  { date: "1920-01-01", open: 107, high: 119, low: 67, close: 107.23, volume: 0 },
  { date: "1929-09-03", open: 380, high: 381, low: 379, close: 381.17, volume: 0 }, // Pre-crash piek
  { date: "1929-10-29", open: 252, high: 252, low: 213, close: 230.07, volume: 16410000 }, // Black Tuesday
  { date: "1932-07-08", open: 42, high: 43, low: 40, close: 41.22, volume: 0 }, // Great Depression bodem
  { date: "1940-01-01", open: 150, high: 155, low: 111, close: 150.24, volume: 0 },
  { date: "1950-01-01", open: 200, high: 228, low: 197, close: 200.13, volume: 0 },
  { date: "1960-01-01", open: 679, high: 685, low: 566, close: 679.36, volume: 0 },
  { date: "1970-01-01", open: 809, high: 842, low: 631, close: 809.2, volume: 0 },
  { date: "1980-01-01", open: 838, high: 1000, low: 759, close: 838.74, volume: 0 },
  { date: "1987-10-19", open: 2247, high: 2247, low: 1739, close: 1738.74, volume: 608120000 }, // Black Monday
  { date: "1990-01-01", open: 2753, high: 2999, low: 2365, close: 2753.2, volume: 0 },
  { date: "2000-01-14", open: 11723, high: 11750, low: 11400, close: 11722.98, volume: 0 }, // Dot-com piek
]

export const candlestickData = [
  // 2000s Data - Correcte DJI waarden
  { date: "2000-01-14", open: 11723, high: 11750, low: 11400, close: 11722.98, volume: 1200000000 },
  { date: "2000-03-10", open: 10128, high: 10200, low: 9800, close: 9796.03, volume: 1500000000 },
  { date: "2001-09-17", open: 8920, high: 8920, low: 8235, close: 8235.81, volume: 2100000000 },
  { date: "2002-10-09", open: 7286, high: 7400, low: 7200, close: 7286.27, volume: 1800000000 },
  { date: "2007-10-09", open: 14164, high: 14200, low: 14100, close: 14164.53, volume: 900000000 },
  { date: "2008-09-29", open: 10365, high: 10400, low: 9800, close: 10365.45, volume: 2500000000 },
  { date: "2009-03-09", open: 6547, high: 6600, low: 6440, close: 6547.05, volume: 2200000000 },

  // 2010s Data
  { date: "2010-05-06", open: 10520, high: 10520, low: 9869, close: 10520.32, volume: 1900000000 },
  { date: "2015-08-24", open: 15871, high: 16000, low: 15370, close: 15871.35, volume: 1600000000 },
  { date: "2018-02-05", open: 24345, high: 24400, low: 23360, close: 24345.75, volume: 1400000000 },

  // 2020s Data - Gecorrigeerde waarden
  { date: "2020-01-01", open: 28538, high: 28600, low: 28400, close: 28538.44, volume: 800000000 },
  { date: "2020-03-18", open: 19173, high: 19400, low: 18900, close: 19173.98, volume: 2800000000 }, // COVID crash
  { date: "2020-04-01", open: 20943, high: 21200, low: 20700, close: 20943.51, volume: 2300000000 },
  { date: "2021-01-01", open: 30606, high: 30800, low: 30400, close: 30606.48, volume: 1000000000 },
  { date: "2021-11-08", open: 36327, high: 36400, low: 36200, close: 36327.95, volume: 900000000 }, // 2021 piek
  { date: "2022-01-01", open: 36338, high: 36500, low: 36100, close: 36338.3, volume: 1100000000 },
  { date: "2022-10-12", open: 28725, high: 28900, low: 28500, close: 28725.51, volume: 1500000000 },
  { date: "2023-01-01", open: 33147, high: 33300, low: 33000, close: 33147.25, volume: 1200000000 },
  { date: "2024-01-01", open: 37689, high: 37800, low: 37500, close: 37689.54, volume: 1000000000 },
  { date: "2024-03-15", open: 39781, high: 39900, low: 39600, close: 39781.37, volume: 950000000 },

  // Voeg meer recente data toe tot de huidige ~45.000 punten
  { date: "2024-06-01", open: 38500, high: 39200, low: 38300, close: 38900.15, volume: 850000000 },
  { date: "2024-09-01", open: 40200, high: 41500, low: 39800, close: 41200.5, volume: 900000000 },
  { date: "2024-12-01", open: 43800, high: 45200, low: 43500, close: 44800.75, volume: 1100000000 },
  { date: "2025-01-01", open: 44900, high: 45124, low: 44600, close: 45000.0, volume: 950000000 }, // Huidige niveau
]
