import { useEffect } from "react";

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
  useEffect(() => {}, [yellow]);
  return (
    <div
      key={index}
      className={`h-full w-[16%] flex text-xl md:text-2xl rounded-md justify-center items-center transition-colors duration-500  text-black ${
        green ? " bg-green-500" : "bg-neutral-300"
      }
      ${check && !green && !yellow ? "bg-neutral-600" : ""}
      ${yellow && !green ? " bg-yellow-500" : ""}`}
    >
      {letter}
    </div>
  );
}
