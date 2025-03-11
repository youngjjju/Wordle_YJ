"use client";
import { useEffect, useState } from "react";

export default function WordBox({
  index,
  letter,
  green,
  yellow,
  check,
}: {
  index: number;
  letter: string;
  green: boolean;
  yellow: boolean;
  check: boolean;
}) {
  const [scaleUp, setScaleUp] = useState<boolean>(false);
  useEffect(() => {
    if (letter !== "") {
      setScaleUp(true);
      setTimeout(() => {
        setScaleUp(false);
      }, 100);
    } else {
      setScaleUp(false);
    }
  }, [letter]);
  return (
    <div
      key={index}
      className={`h-full w-[16%] flex text-xl md:text-2xl shadow-sm rounded-md justify-center font-semibold items-center transition-colors duration-500  text-black ${
        green ? " bg-green-500" : "bg-neutral-300"
      }
      ${scaleUp ? "scale-115 transition-all duration-200 ease-in" : ""}
      ${check && !green && !yellow ? "bg-neutral-600" : ""}
      ${yellow && !green ? " bg-yellow-500" : ""}`}
    >
      {letter}
    </div>
  );
}
