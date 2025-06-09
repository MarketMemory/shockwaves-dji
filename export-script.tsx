// Dit script helpt je om de benodigde componenten te exporteren naar je bestaande project

/*
STAP 1: Exporteer de benodigde componenten
- BetterCandlestick.tsx
- crash-data.ts (of integreer met je bestaande data)
*/

/*
STAP 2: Installeer benodigde dependencies als je ze nog niet hebt
- date-fns: npm install date-fns
*/

/*
STAP 3: Pas de data integratie aan
- Als je al een data source hebt, pas de BetterCandlestick component aan om jouw data format te gebruiken
- Als je onze data wilt gebruiken, kopieer dan ook de crash-data.ts file
*/

// Voorbeeld van een data adapter functie om je bestaande data te converteren naar het format dat BetterCandlestick verwacht
function adaptDataForCandlestick(yourExistingData) {
  return yourExistingData.map((item) => ({
    date: item.timestamp || item.date,
    open: Number(item.open) || Number(item.price) || 0,
    high: Number(item.high) || Number(item.price) || 0,
    low: Number(item.low) || Number(item.price) || 0,
    close: Number(item.close) || Number(item.price) || 0,
    volume: Number(item.volume) || 0,
  }))
}
