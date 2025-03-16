"use client";
import Keyboard from "@/components/keyboard";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import WordMatrix from "@/components/wordMatrix";

import { useEffect, useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState<string>("");
  const [answerUpperCase, setAnswerUpperCase] = useState<string>("");
  const [answerArray, setAnswerArray] = useState<string[]>([]);
  const [rule, setRule] = useState<boolean>(false);

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
      className="h-auto relative gap-0.5 w-full min-[455px]:w-[450px] pb-5 flex flex-col overflow-hidden  rounded-2xl bg-neutral-100
    "
    >
      <div className="flex z-50 absolute right-3 top-4 items-center space-x-2">
        <Switch id="airplane-mode" onClick={() => setRule(!rule)} />
        <Label htmlFor="airplane-mode">Rule?</Label>
      </div>
      <div
        className={`${
          rule ? "opacity-100 visible" : "opacity-0 invisible"
        } w-full absolute h-screen transition-all flex flex-col text-pretty justify-center gap-16 duration-150 bg-slate-400`}
      >
        <div className="w-full px-5  flex items-center leading-relaxed justify-center text-pretty text-sm sm:text-lg md:text-xl font-semibold">
          Wordle은 5글자로 된 단어를 맞추는 게임입니다. <br />
          플레이어는 6번의 기회 동안 추측을 하며, <br />각 추측에 대해 색깔로
          피드백을 받습니다: <br />
        </div>
        <div className="w-full px-7  flex items-center leading-relaxed justify-center text-pretty text-sm sm:text-lg md:text-xl font-semibold">
          초록색: 글자가 정확한 위치에 있음.
          <br /> 노란색: 글자는 단어에 포함되지만 위치가 틀림. <br />
          회색: 글자가 단어에 포함되지 않음. <br />이 과정을 통해 단어를 맞추는
          것이 목표입니다.
        </div>
      </div>
      <div className="flex justify-center items-end w-full text-[33px] md:text-4xl font-semibold h-[15%] pb-[5%]">
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
