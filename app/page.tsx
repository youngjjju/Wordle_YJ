"use client";
import Keyboard from "@/components/keyboard";
import WordMatrix from "@/components/wordMatrix";
import { useEffect, useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState<string>("");
  const [answerUpperCase, setAnswerUpperCase] = useState<string>("");
  const [answerArray, setAnswerArray] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomWord = async () => {
      const res = await fetch("/api/randomWord");
      const data = await res.json();
      const generatedWord = data.word;
      setAnswer(generatedWord);
      setAnswerUpperCase(generatedWord.toUpperCase());
      setAnswerArray(generatedWord.toUpperCase().split(""));
    };

    fetchRandomWord();
  }, []);
  return (
    <div
      className="h-auto relative gap-0.5 w-full min-[455px]:w-[450px] pb-5 flex flex-col  rounded-2xl bg-neutral-100
    "
    >
      <div className="flex justify-center items-end w-full text-[33px] md:text-4xl font-semibold h-[17%] pb-[5%]">
        {`Let's Wordle!`} 🕵️‍♂️
      </div>
      <WordMatrix
        answer={answer}
        answerUpperCase={answerUpperCase}
        answerArray={answerArray}
      />
      <Keyboard className="" />
      <div className="w-full h-[5%] flex justify-end">
        <a
          href="/ "
          className="w-20 rounded-2xl ring-2 bottom-3 flex justify-center mr-5 h-full items-center "
        >
          RESTART
        </a>
      </div>
    </div>
  );
}
