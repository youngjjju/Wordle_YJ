// 코드 더러움 주의

import { showingGreen } from "./showingGreen";
import { showingYellow } from "./showingYellow";
import { wordValidation } from "./wordValidation";

// 엔터를 눌렀을 때, answerArray와 word의 index와 값이 같으면 초록색, 값만 같으면 노란색
interface AnswerCheckProps {
  word: string[];
  setWord: React.Dispatch<React.SetStateAction<string[]>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  event: KeyboardEvent;
  joinedWord: string;
  winningGame: () => void;
  completeRow: () => void;
  answerUpperCase: string;
  answerArray: string[];
  index: number;
  yellow: boolean[];
  setYellow: React.Dispatch<React.SetStateAction<boolean[]>>;
  green: boolean[];
  setGreen: React.Dispatch<React.SetStateAction<boolean[]>>;
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  setCheck: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export async function answerCheck({
  word,
  setWord,
  setIndex,
  event,
  joinedWord,
  winningGame,
  completeRow,
  answerUpperCase,
  answerArray,
  index,
  yellow,
  setYellow,
  green,
  setGreen,
  setValid,
  setCheck,
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
      const joinedWord = word.join("");

      const validChecked = await wordValidation(joinedWord);
      if (validChecked === false) {
        setValid(false);
        alert("올바른 단어를 입력해주세요.");
        return;
      }
      const updatedGreen = showingGreen({ word, answerArray, green }); // OK
      const updatedYellow = showingYellow({ word, answerArray, yellow }); // OK
      setCheck([true, true, true, true, true]);
      setGreen(updatedGreen);
      setYellow(updatedYellow);
      completeRow();
    }
  }
}
