export default function WordBox({
  index,
  letter,
}: {
  index: number;
  letter: string;
}) {
  return (
    <div
      key={index}
      className="size-20 flex text-2xl  justify-center items-center bg-neutral-300 text-black"
    >
      {letter}
    </div>
  );
}
