import { NextResponse } from "next/server";
import words from "@/components/fiveLengthWords";

export function randomWordGenarator(): string {
  const randomIndex = Math.floor(Math.random() * words.words.length);
  return words.words[randomIndex];
}

export async function GET() {
  const randomWord = randomWordGenarator();
  console.log(randomWord);
  return NextResponse.json({ word: randomWord });
}
