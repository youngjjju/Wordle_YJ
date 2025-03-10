"use client";
import { useEffect, useState, useCallback } from "react";


import WordBox from "./wordBox";

export default function WordRow({
  active,
  winningGame,
  answer,
  answerUpperCase,
  answerArray,
}: {
  active: boolean;
  winningGame: (joinedWord: string) => void;
  answer: string;
  answerUpperCase: string;
  answerArray: string[];
}) {
  const [word, setWord] = useState<string[]>(["", "", "", "", ""]);
  const [index, setIndex] = useState<number>(0);
  const [joinedWord, setJoinedWord] = useState<string>("");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!active) return;
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
          winningGame(joinedWord);
        }
      }
    },
    [index, joinedWord, active, answerUpperCase, winningGame]
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
