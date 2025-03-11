"use client";
import { useEffect, useState } from "react";
import WordRow from "./wordRow";

import Link from "next/link";

export default function WordMatrix({
  answer,
  answerUpperCase,
  answerArray,
}: {
  answer: string;
  answerUpperCase: string;
  answerArray: string[];
}) {
  const [winning, setWinnging] = useState<boolean>(false);
  function winnginGame() {
    setWinnging(true);
  }

  const [focusedRow, setFocusedRow] = useState<number>(0);
  const completeRow = () => {
    if (focusedRow < 6) {
      setFocusedRow(focusedRow + 1);
    }
  };
  const [lossing, setLossing] = useState<boolean>(false);

  useEffect(() => {
    if (focusedRow === 6 && !winning) {
      setLossing(true);
    }
  }, [focusedRow, winning]);

  const [valid, setValid] = useState<boolean>(true);

  return (
    <>
      {[...Array(6)].map((_, i) => (
        <WordRow
          completeRow={completeRow}
          answer={answer}
          answerArray={answerArray}
          answerUpperCase={answerUpperCase}
          winningGame={winnginGame}
          key={i}
          active={focusedRow === i}
          valid={valid}
          setValid={setValid}
        />
      ))}
      {/** 단어가 유효하지 않을 시 보여주는 화면 */}
      {/** 성공 시에 보여주는 화면 */}
      <div
        className={`w-full absolute h-full z-10 bg-slate-500 transition-all text-white  rounded-3xl duration-1000 ease-out ${
          winning ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-full h-3/5 flex gap-5 flex-col justify-center items-center  text-5xl font-semibold">
          <span>성공하셨네요!</span>
          <p className=" text-xl">정답은 {answer}입니다.</p>
        </div>
        <Link
          href={`https://en.dict.naver.com/#/search?query=${answer}`}
          className="w-full justify-center items-center py-16 flex text-2xl"
        >
          단어의 뜻이 궁금하다면?
        </Link>

        <a
          href={`/`}
          className="w-full justify-center items-center py-16 flex text-2xl"
        >
          다시 시작하기
        </a>
      </div>
      {/** 실패 시에 보여주는 화면 */}
      <div
        className={`w-full absolute h-full z-10 rounded-3xl bg-gray-800 transition-all  text-white duration-1000 ease-out ${
          lossing ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-full h-3/5 flex gap-5 flex-col justify-center items-center  text-5xl font-semibold">
          <span>아쉽습니다 ㅠㅠ</span>
          <p className=" text-xl">정답은 {answer}입니다.</p>
        </div>
        <Link
          href={`https://en.dict.naver.com/#/search?query=${answer}`}
          className="w-full justify-center items-center py-16 flex text-2xl"
        >
          단어의 뜻이 궁금하다면?
        </Link>

        <a
          href={`/`}
          className="w-full justify-center items-center py-16 flex text-2xl"
        >
          다시 시작하기
        </a>
      </div>
    </>
  );
}
