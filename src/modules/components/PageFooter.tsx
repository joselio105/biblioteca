import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";

interface Props {
  backTo: string;
}

export function PageFooter({ backTo }: Props) {
  return (
    <footer className="flex items-center justify-end mt-4">
      <Button to={backTo} className="w-1/3">
        <ArrowLeft size={28} />
        Voltar
      </Button>
    </footer>
  );
}
