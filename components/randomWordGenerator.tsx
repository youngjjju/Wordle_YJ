import words from "./fiveLengthWords";

export default function randomWordGenarator() {
  const randomIndex = Math.floor(Math.random() * words.words.length);
  console.log(words.words[randomIndex]);
  return words.words[randomIndex];
}
