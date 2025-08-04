export async function getGoldPrice(): Promise<number | null> {
const url = process.env.GOLD_API_URL || `https://api.gold-api.com/price/XAU`;

  try {
    const response = await fetch(url, {
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Next.js API)"
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      console.error(
        `Gold API request failed: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    console.log("Gold API Response Data:", data);
    return data.price || null;
  } catch (error) {
    console.error("Error fetching the gold price:", error);
    return null;
  }
}