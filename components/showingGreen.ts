export function showingGreen({
  word,
  answerArray,
  green,
}: {
  word: string[];
  answerArray: string[];
  green: boolean[];
}) {
  const updatedGreen = [...green];
  for (let i = 0; i < 5; i++) {
    if (word[i] === answerArray[i]) {
      updatedGreen[i] = true;
    } else {
      updatedGreen[i] = false;
    }
  }
  return updatedGreen;
}
