import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
}

export function Button({ children, to, ...props }: Props) {
  const style =
    "bg-blue-900 text-stone-200 text-lg px-4 py-3 rounded-lg hover:bg-blue-700 duration-300 flex items-center justify-center gap-3";
  return to ? (
    <Link className={style} to={to}>
      {children}
    </Link>
  ) : (
    <button className={style} {...props}>
      {children}
    </button>
  );
}
