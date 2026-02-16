// PICK A RANDOM QUOTE FROM THE QUOTES ARRAY
export function pickRandomQuote(quotes) {
   if (!Array.isArray(quotes) || quotes.length === 0) return null
   return quotes[Math.floor(Math.random() * quotes.length)]
}