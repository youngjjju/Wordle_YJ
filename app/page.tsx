"use client";
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
      className="h-screen relative gap-0.5  w-full flex flex-col  bg-neutral-100
    "
    >
      <div className="flex justify-center items-end w-full text-5xl font-semibold h-44 pb-12">
        WORDLE 💥
      </div>
      <WordMatrix
        answer={answer}
        answerUpperCase={answerUpperCase}
        answerArray={answerArray}
      />
    </div>
  );
}
