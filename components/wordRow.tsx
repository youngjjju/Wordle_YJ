import { useEffect, useState, useCallback } from "react";
import WordBox from "./wordBox";
import { answerCheck } from "./answerCheck";

interface KeyboardColor {
  [key: string]: {
    black: boolean;
    yellow: boolean;
    green: boolean;
  };
}

interface WordRowProps {
  active: boolean;
  winningGame: () => void;
  completeRow: () => void;
  answer: string;
  answerUpperCase: string;
  answerArray: string[];
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialKeyboardColor: KeyboardColor = {
  Q: { black: false, yellow: false, green: false },
  W: { black: false, yellow: false, green: false },
  E: { black: false, yellow: false, green: false },
  R: { black: false, yellow: false, green: false },
  T: { black: false, yellow: false, green: false },
  Y: { black: false, yellow: false, green: false },
  U: { black: false, yellow: false, green: false },
  I: { black: false, yellow: false, green: false },
  O: { black: false, yellow: false, green: false },
  P: { black: false, yellow: false, green: false },
  A: { black: false, yellow: false, green: false },
  S: { black: false, yellow: false, green: false },
  D: { black: false, yellow: false, green: false },
  F: { black: false, yellow: false, green: false },
  G: { black: false, yellow: false, green: false },
  H: { black: false, yellow: false, green: false },
  J: { black: false, yellow: false, green: false },
  K: { black: false, yellow: false, green: false },
  L: { black: false, yellow: false, green: false },
  Z: { black: false, yellow: false, green: false },
  X: { black: false, yellow: false, green: false },
  C: { black: false, yellow: false, green: false },
  V: { black: false, yellow: false, green: false },
  B: { black: false, yellow: false, green: false },
  N: { black: false, yellow: false, green: false },
  M: { black: false, yellow: false, green: false },
};

export default function WordRow({
  active,
  winningGame,
  completeRow,
  answerUpperCase,
  answerArray,
  valid,
  setValid,
}: WordRowProps) {
  const [word, setWord] = useState<string[]>(["", "", "", "", ""]); // word가 사용자가 입력한 단어!
  const [index, setIndex] = useState<number>(0);
  const [joinedWord, setJoinedWord] = useState<string>("");
  const [yellow, setYellow] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]); // 위치는 다른데 있긴 하면 yellow true
  const [green, setGreen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]); // 위치랑 값까지 같으면 green true
  const [ckeck, setCheck] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [keyboardColor, setkeyboardColor] =
    useState<KeyboardColor>(initialKeyboardColor);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!active) return;
      {
        answerCheck({
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
          setCheck,
          valid,
          setValid,
        });
      }
    },
    [
      index,
      joinedWord,
      green,
      answerArray,
      word,
      active,
      answerUpperCase,
      winningGame,
      completeRow,
      yellow,
      valid,
      setValid,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setJoinedWord(word.join(""));
  }, [word]);

  useEffect(() => {
    if (!active) {
      word.forEach((_, i) => {
        if (keyboardColor.hasOwnProperty(word[i])) {
          if (green[i]) {
            setkeyboardColor((prev) => {
              return {
                ...prev,
                [word[i]]: { black: false, yellow: false, green: true },
              };
            });
          } else if (yellow[i]) {
            setkeyboardColor((prev) => {
              return {
                ...prev,
                [word[i]]: { black: false, yellow: true, green: false },
              };
            });
          } else {
            setkeyboardColor((prev) => {
              return {
                ...prev,
                [word[i]]: { black: true, yellow: false, green: false },
              };
            });
          }
        }
      });
    }
  }, [active]);

  useEffect(() => {
    console.log("Updated keyboardColor: ", keyboardColor);
  }, [keyboardColor]); // OK

  return (
    <div className="w-full my-1 h-[9%] gap-2 flex justify-center items-center">
      {word.map((letter, index) => (
        <WordBox
          key={index}
          index={index}
          letter={letter}
          green={green[index]}
          yellow={yellow[index]}
          check={ckeck[index]}
        />
      ))}
    </div>
  );
}
