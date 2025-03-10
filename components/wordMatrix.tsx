"use client";
import { useState } from "react";
import WordRow, { answerUpperCase } from "./wordRow";

import Link from "next/link";

export default function WordMatrix() {
  const [winning, setWinnging] = useState<boolean>(false);

  function winnginGame() {
    setWinnging(true);
  }

  const [focusedRow, setFocusedRow] = useState<number>(0);
  const handleRowComplete = (id: number) => {
    if (id < 5) {
      setFocusedRow(id + 1);
    }
  };

  return (
    <>
      {[...Array(6)].map((_, i) => (
        <WordRow winningGame={winnginGame} key={i} active={focusedRow === i} />
      ))}
      <div
        className={`w-full absolute h-full bg-slate-500 transition-all duration-1000 ease-out ${
          winning
            ? "translate-x-0 translate-y-0 rotate-0 opacity-100"
            : "translate-x-[3000px] rotate-[540deg] -translate-y-[1000px] opacity-0"
        }`}
      >
        <div className="pt-32 w-full h-16 flex justify-center items-center text-white text-5xl font-semibold">
          성공하셨네요!
        </div>
        <Link
          href={`https://en.dict.naver.com/#/search?query=${answerUpperCase}`}
          className="w-full h-full justify-center items-center flex"
        >
          단어의 뜻이 궁금하다면?
        </Link>
      </div>
    </>
  );
}
