interface AnswerCheckProps {
  setWord: React.Dispatch<React.SetStateAction<string[]>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  event: KeyboardEvent;
  joinedWord: string;
  winningGame: () => void;
  completeRow: () => void;
  answerUpperCase: string;
  index: number;
}

export function answerCheck({
  setWord,
  setIndex,
  event,
  joinedWord,
  winningGame,
  completeRow,
  answerUpperCase,
  index,
}: AnswerCheckProps) {
  if (event.key === "Backspace" && index > 0) {
    setIndex((prev) => prev - 1);
    setWord((prev) => {
      const newArray = [...prev];
      newArray[index - 1] = "";
      return newArray;
    });
  } else if (event.key.length === 1 && index < 5) {
    setWord((prev) => {
      const newArray = [...prev];
      newArray[index] = event.key.toUpperCase();
      return newArray;
    });
    setIndex((prev) => prev + 1);
  } else if (event.key === "Enter" && index === 5) {
    if (joinedWord === answerUpperCase) {
      winningGame();
    } else {
      completeRow();
    }
  }
}
