
export async function getGoldPrice(): Promise<number | null> {

  
  const url = `https://api.gold-api.com/price/XAU`;

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        'Gold API request failed: ${response.status} ${response.statusText}',
        errorData
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
