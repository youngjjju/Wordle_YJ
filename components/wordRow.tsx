"use client";
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
}

export default function WordRow({
  active,
  winningGame,
  completeRow,
  answer,
  answerArray,
  answerUpperCase,
}: WordRowProps) {
  const [word, setWord] = useState<string[]>(["", "", "", "", ""]);
  const [index, setIndex] = useState<number>(0);
  const [joinedWord, setJoinedWord] = useState<string>("");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!active) return;
      {
        answerCheck({
          setWord,
          setIndex,
          event,
          joinedWord,
          winningGame,
          completeRow,
          answerUpperCase,
          index,
        });
      }
    },
    [index, joinedWord, active, answerUpperCase, winningGame, completeRow]
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

  console.log({ word, index, joinedWord });

  return (
    <div className="w-full h-20 gap-2  flex justify-center items-center">
      {word.map((letter, index) => (
        <WordBox key={index} index={index} letter={letter} />
      ))}
    </div>
  );
}
