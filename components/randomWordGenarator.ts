import words from "./fiveLengthWords";

export function randomWordGenarator() {
  const randomIndex = Math.floor(Math.random() * words.words.length);
  return words.words[randomIndex];
}
