import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Keyboard({ className }: { className: string }) {
  const topKeyboard = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleKeyboard = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomKeyboard = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"];

  useEffect(() => {
    const buttons = document.querySelectorAll(".key");

    const handleClick = (event) => {
      const key = event.target.getAttribute("data-key");
      let keyCode, code, which;

      if (key === "ENTER") {
        keyCode = 13;
        code = "Enter";
        which = 13;
      } else if (key === "DEL") {
        keyCode = 8; // Del가 아니라 Backspace임
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
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const renderKeyboardRow = (keys, last) => {
    return keys.map((key) => (
      <button
        key={key}
        className={`key flex justify-center w-10 rounded-lg h-16 items-center text-2xl bg-neutral-500 ${
          last ? "last:w-16 first:w-16 first:text-xl last:text-xl" : ""
        }`}
        data-key={key}
      >
        {key}
      </button>
    ));
  };

  return (
    <div
      className={`${cn(
        className
      )} w-full p-5 h-auto flex flex-col gap-2 justify-center items-center`}
    >
      <div className="w-full h-auto flex justify-center gap-2">
        {renderKeyboardRow(topKeyboard, false)}
      </div>
      <div className="w-full h-auto flex justify-center gap-2">
        {renderKeyboardRow(middleKeyboard, false)}
      </div>
      <div className="w-full h-auto flex justify-center gap-2">
        {renderKeyboardRow(bottomKeyboard, true)}
      </div>
    </div>
  );
}
