import { NextRequest, NextResponse } from "next/server";
import words from "@/components/fiveLengthWords";

function randomWordGenarator(): string {
  const randomIndex = Math.floor(Math.random() * words.words.length);
  return words.words[randomIndex];
}

export const handler = {
  GET: async (req: NextRequest) => {
    const randomWord = randomWordGenarator();
    console.log(randomWord);
    console.log(req);

    return NextResponse.json({ word: randomWord });
  },
};
