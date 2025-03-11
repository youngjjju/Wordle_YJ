export function showingYellow({
  word,
  answerArray,
  yellow,
}: {
  word: string[];
  answerArray: string[];
  yellow: boolean[];
}) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (i !== j && word[i] === answerArray[j]) {
        yellow[i] = true;
      }
    }
  }

  return yellow;
}
