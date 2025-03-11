import { useEffect, useState, useCallback } from "react";
import WordBox from "./wordBox";
import { answerCheck } from "./answerCheck";
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
