export async function getQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  const data = await response.json();

  return {
    text: data.quote,
    author: data.author,
  };
}