import words from "@/components/fiveLengthWords";

export function randomWordGenarator() {
  const randomIndex = Math.floor(Math.random() * words.words.length);
  return words.words[randomIndex];
}

export async function GET() {
  const randomWord = randomWordGenarator();
  console.log(randomWord);
  return new Response(JSON.stringify({ word: randomWord }));
}
