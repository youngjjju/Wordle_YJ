import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { keyboardColor } from "./keyboardColor";

export default function Keyboard({ className }: { className: string }) {
  const topKeyboard = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleKeyboard = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomKeyboard = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"];

  useEffect(() => {
    const buttons = document.querySelectorAll(".key");

    const handleClick = (event: MouseEvent) => {
      const key = (event.target as HTMLElement).getAttribute("data-key");

      if (key) {
        let keyCode, code, which;

        if (key === "ENTER") {
          keyCode = 13;
          code = "Enter";
          which = 13;
        } else if (key === "DEL") {
          keyCode = 8; // Del이 아니라 Backspace임
          code = "Backspace";
          which = 8;
        } else {
          keyCode = key.toUpperCase().charCodeAt(0);
          code = `Key${key.toUpperCase()}`;
          which = key.toUpperCase().charCodeAt(0);
        }

        const keyboardEvent = new KeyboardEvent("keydown", {
          key: key === "ENTER" ? "Enter" : key === "DEL" ? "Backspace" : key,
          code: code,
          keyCode: keyCode,
          which: which,
          bubbles: true,
          cancelable: true,
        });

        document.dispatchEvent(keyboardEvent);
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleClick as EventListener);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleClick as EventListener);
      });
    };
  }, []);

  const renderKeyboardRow = (keys: string[], last: boolean) => {
    return keys.map((key) => {
      const color = keyboardColor[key] || {
        black: false,
        yellow: false,
        green: false,
      };

      return (
        <button
          key={key}
          className={`key flex justify-center text-lg w-[11%] rounded-lg h-full items-center sm:text-2xl bg-neutral-400 ${
            color.black ? "bg-neutral-600" : ""
          } ${color.yellow ? "bg-yellow-500" : ""} ${
            color.green ? "bg-green-500" : ""
          } ${
            last
              ? "last:w-[13%] first:w-[13%] first:text-[11px] last:text-[16px]"
              : ""
          }`}
          data-key={key}
        >
          {key}
        </button>
      );
    });
  };

  return (
    <div
      className={`${cn(
        className
      )} w-full p-3  flex flex-col gap-2 h-[30%] justify-center items-center`}
    >
      <div className="w-full h-1/3 flex justify-center gap-1">
        {renderKeyboardRow(topKeyboard, false)}
      </div>
      <div className="w-full h-1/3 flex justify-center gap-1">
        {renderKeyboardRow(middleKeyboard, false)}
      </div>
      <div className="w-full h-1/3 flex justify-center gap-1">
        {renderKeyboardRow(bottomKeyboard, true)}
      </div>
    </div>
  );
}
