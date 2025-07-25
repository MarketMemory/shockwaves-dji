export const crashEvents = [
  {
    id: 1,
    name: "Black Tuesday",
    date: "1929-10-29",
    severity: "Extreme",
    impact: "-11.7% on Oct 29, -12.8% on Oct 28",
    description:
      "De meest verwoestende beurscrash in de VS, die het begin van de Grote Depressie markeerde. Paniekverkopen leidden tot enorme verliezen.",
    recovery: "Herstel duurde 25 jaar tot pre-crash niveaus",
  },
  {
    id: 2,
    name: "Black Monday",
    date: "1987-10-19",
    severity: "Extreme",
    impact: "-22.6% in één dag",
    description:
      "De grootste procentuele daling op één dag in de beursgeschiedenis. Veroorzaakt door programmahandel en portefeuilleverzekeringsstrategieën.",
    recovery: "Hersteld binnen 2 jaar",
  },
  {
    id: 3,
    name: "Dot-com Crash",
    date: "2000-01-14",
    severity: "High",
    impact: "-38% van piek tot dal",
    description:
      "De ineenstorting van technologieaandelen na jaren van speculatie. Veel dot-com bedrijven gingen failliet.",
    recovery: "Herstel duurde 7 jaar tot nieuwe highs",
  },
  {
    id: 4,
    name: "9/11 Attacks",
    date: "2001-09-17",
    severity: "High",
    impact: "-14.3% in één week",
    description:
      "Markten waren 4 dagen gesloten na de terroristische aanslagen. Bij heropening vond massale verkoop plaats door onzekerheid.",
    recovery: "Hersteld binnen ~2 maanden",
  },
  {
    id: 5,
    name: "Financial Crisis",
    date: "2008-09-29",
    severity: "Extreme",
    impact: "-54% van piek tot dal",
    description:
      "De subprime-hypotheekcrisis leidde tot de ineenstorting van grote financiële instellingen. Het faillissement van Lehman Brothers veroorzaakte wereldwijde paniek.",
    recovery: "Herstel duurde 5 jaar tot nieuwe highs",
  },
  {
    id: 6,
    name: "Flash Crash",
    date: "2010-05-06",
    severity: "Medium",
    impact: "-9% in minuten",
    description:
      "Hoge-frequentiehandelsalgoritmen veroorzaakten een snelle marktcrash en herstel binnen minuten. Benadrukte marktfragiliteit.",
    recovery: "Hersteld dezelfde dag",
  },
  {
    id: 7,
    name: "COVID-19 Crash",
    date: "2020-03-16",
    severity: "High",
    impact: "-37% in 5 weken",
    description:
      "Angst voor de wereldwijde pandemie leidde tot de snelste bearmarkt in de geschiedenis. Ongekende overheidsinterventie volgde.",
    recovery: "Hersteld binnen 5 maanden",
  },
  {
    id: 8,
    name: "The Great Shockwave",
    date: "2026-08-15",
    severity: "Extreme",
    impact: "Geprojecteerde -60% daling",
    description:
      "Voorspelde grote marktcorrectie gebaseerd op Elliott Wave-analyse. Verwacht te worden veroorzaakt door schuldenproblemen en geopolitieke spanningen.",
    recovery: "Geschat 3-7 jaar voor volledig herstel",
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
   { date: "1896-05-26", open: 28.5, high: 29.2, low: 28.0, close: 28.89, volume: 0 },
  { date: "1900-01-01", open: 65.5, high: 66.5, low: 65.0, close: 66.08, volume: 0 },
  { date: "1910-01-01", open: 81.0, high: 82.0, low: 80.5, close: 81.36, volume: 0 },
  { date: "1920-01-01", open: 106.8, high: 107.5, low: 106.5, close: 107.23, volume: 0 },
  { date: "1929-09-03", open: 380.5, high: 381.5, low: 379.8, close: 381.17, volume: 0 },
  { date: "1929-10-29", open: 252.0, high: 252.0, low: 213.0, close: 230.07, volume: 16410000 },
  { date: "1932-07-08", open: 41.0, high: 41.5, low: 40.8, close: 41.22, volume: 0 },
  { date: "1940-01-01", open: 149.8, high: 150.5, low: 149.5, close: 150.24, volume: 0 },
  { date: "1950-01-01", open: 199.8, high: 200.5, low: 199.5, close: 200.13, volume: 0 },
  { date: "1960-01-01", open: 678.5, high: 680.0, low: 678.0, close: 679.36, volume: 0 },
  { date: "1970-01-01", open: 808.5, high: 809.5, low: 808.0, close: 809.2, volume: 0 },
  { date: "1980-01-01", open: 838.0, high: 839.0, low: 837.5, close: 838.74, volume: 0 },
  { date: "1987-10-19", open: 2247.0, high: 2247.0, low: 1739.0, close: 1738.74, volume: 608120000 },
  { date: "1990-01-01", open: 2752.5, high: 2754.0, low: 2752.0, close: 2753.2, volume: 0 },
  { date: "2000-01-14", open: 11700.0, high: 11750.0, low: 11650.0, close: 11722.98, volume: 1200000000 },
  { date: "2005-01-01", open: 10780.0, high: 10790.0, low: 10770.0, close: 10783.75, volume: 0 },
  { date: "2009-03-09", open: 6540.0, high: 6550.0, low: 6530.0, close: 6547.05, volume: 0 },
  { date: "2010-01-01", open: 10420.0, high: 10430.0, low: 10410.0, close: 10428.05, volume: 0 },
  { date: "2015-01-01", open: 17820.0, high: 17830.0, low: 17810.0, close: 17823.07, volume: 0 },
  { date: "2020-01-01", open: 28630.0, high: 28640.0, low: 28620.0, close: 28634.88, volume: 0 },
  { date: "2020-03-31", open: 21910.0, high: 21920.0, low: 21900.0, close: 21917.16, volume: 0 },
  { date: "2020-12-31", open: 30600.0, high: 30610.0, low: 30590.0, close: 30606.48, volume: 0 },
  { date: "2024-12-31", open: 42510.0, high: 42530.0, low: 42500.0, close: 42520.53, volume: 0 },
  { date: "2025-06-06", open: 44990.0, high: 45124.0, low: 44600.0, close: 45000.00, volume: 0 },
]

export const candlestickData = [
  // 2000s Data - Correcte DJI waarden
  { date: "2000-01-14", open: 11700.0, high: 11750.0, low: 11650.0, close: 11722.98, volume: 1200000000 },
  { date: "2000-03-10", open: 9800.0, high: 9900.0, low: 9700.0, close: 9796.03, volume: 1500000000 },
  { date: "2001-09-17", open: 8300.0, high: 8920.0, low: 8200.0, close: 8235.81, volume: 2100000000 },
  { date: "2002-10-09", open: 7300.0, high: 7400.0, low: 7200.0, close: 7286.27, volume: 1800000000 },
  { date: "2007-10-09", open: 14150.0, high: 14200.0, low: 14100.0, close: 14164.53, volume: 900000000 },
  { date: "2008-09-29", open: 10400.0, high: 10450.0, low: 9900.0, close: 10365.45, volume: 2500000000 },
  { date: "2009-03-09", open: 6540.0, high: 6550.0, low: 6530.0, close: 6547.05, volume: 0 },
  { date: "2010-05-06", open: 10550.0, high: 10560.0, low: 9869.6, close: 10520.32, volume: 1900000000 },
  { date: "2015-08-24", open: 15900.0, high: 16000.0, low: 15370.0, close: 15871.35, volume: 1600000000 },
  { date: "2018-02-05", open: 24350.0, high: 24400.0, low: 23360.0, close: 24345.75, volume: 1400000000 },
  { date: "2020-03-16", open: 20180.0, high: 20200.0, low: 18900.0, close: 19173.98, volume: 2800000000 },
  { date: "2020-04-01", open: 20950.0, high: 21200.0, low: 20700.0, close: 20943.51, volume: 2300000000 },
  { date: "2021-01-01", open: 30600.0, high: 30800.0, low: 30400.0, close: 30606.48, volume: 100000000000 },
  { date: "2021-11-08", open: 36300.0, high: 36400.0, low: 36200.0, close: 36327.95, volume: 900000000 },
  { date: "2022-10-12", open: 28750.0, high: 28800.0, low: 28500.0, close: 28725.51 , volume: 1500000000000 },
  { date: "2023-01-01", open: 33100.0, high: 33300.0, low: 33000.0, close: 33147.25, volume: 1200000000000 },
  { date: "2024-01-01", open: 37680.0, high: 37800.0, low: 37500.0, close: 37689.54, volume: 100000000000 },
  { date: "2024-03-15", open: 39780.0, high: 39900.0, low: 39600.0, close: 39781.76, volume: 950000000 },
  { date: "2024-06-01", open: 38500.0, high: 39200.0, low: 38300.0, close: 38900.15, volume: 850000000 },
  { date: "2024-09-01", open: 40200.0, high: 41500.0, low: 39800.0, close: 41200.50, volume: 900000000 },
  { date: "2024-12-01", open: 43800.0, high: 45200.0, low: 43500.0, close: 44000.75, volume: 1100000000 },
  { date: "2025-01-01", open: 43900.0, high: 44500.0, low: 43600.0, close: 44000.00, volume: 950000000 },
  { date: "2025-06-01", open: 44800.0, high: 45124.0, low: 44600.0, close: 45000.00, volume: 900000000 },

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
  { date: "2024-12-31", open: 42520.53, high: 42520.53, low: 42520.53, close: 42520.53, volume: 0 },
  { date: "2025-06-06", open: 42762.87, high: 42762.87, low: 42762.87, close: 42762.87, volume: 0 },

  // Voeg meer recente data toe tot de huidige ~45.000 punten
  { date: "2024-06-01", open: 38500, high: 39200, low: 38300, close: 38900.15, volume: 850000000 },
  { date: "2024-09-01", open: 40200, high: 41500, low: 39800, close: 41200.5, volume: 900000000 },
  { date: "2024-12-01", open: 43800, high: 45200, low: 43500, close: 44800.75, volume: 1100000000 },
  { date: "2025-01-01", open: 44900, high: 45124, low: 44600, close: 45000.0, volume: 950000000 },
  { date: "2025-06-06", open: 42762.87, high: 42762.87, low: 42762.87, close: 42762.87, volume: 0 }, // Huidige niveau
]
