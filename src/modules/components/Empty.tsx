import { CircleOff } from "lucide-react";

interface Props {
  text?: string;
}

export function Empty({ text = "Nenhum item encontrado" }: Props) {
  return (
    <div className="text-stone-400 flex flex-col gap-3 items-center justify-center">
      <CircleOff size={76} />
      {text}
    </div>
  );
}
