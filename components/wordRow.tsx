"use client";
import { useEffect, useState, useCallback } from "react";

export default function WordRow() {
  const [word, setWord] = useState<string[]>(["", "", "", "", ""]);
  const [index, setIndex] = useState<number>(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
      }
    },
    [index]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full h-20 gap-2  flex justify-center items-center">
      {word.map((letter, index) => (
        <div
          key={index}
          className="size-20 flex justify-center items-center bg-neutral-300 text-black"
        >
          {letter}
        </div>
      ))}
      <button onClick={() => console.log({ word })}>이거</button>
    </div>
  );
}
