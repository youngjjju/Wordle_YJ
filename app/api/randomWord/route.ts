import { randomWordGenarator } from "@/components/randomWordGenarator";

export async function GET() {
  const randomWord = randomWordGenarator();
  console.log(randomWord);
  return new Response(JSON.stringify({ word: randomWord }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
