import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Loading } from "./Loading";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSecondary?: boolean;
  to?: string;
  isLoading?: boolean;
}

export function Button({
  to,
  isSecondary = false,
  isLoading = false,
  ...props
}: Props) {
  const buttonStyle = clsx(
    "min-w-16 p-3 rounded-lg duration-300 border flex items-center justify-center gap-3",
    {
      "bg-secondary-900 text-primary-200]": !isSecondary,
      "border-secondary-700 hover:bg-secondary-700": !isSecondary,
      "dark:text-secondary-200": !isSecondary,
      "border-secondary-700 text-primary-700": isSecondary,
      "hover:text-secondary-700 dark:hover:text-secondary-300": isSecondary,
      "dark:border-secondary-500 dark:text-primary-300": isSecondary,
    },
    props.className
  );
  if (to) {
    return (
      <Link to={to} className={buttonStyle}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button className={buttonStyle} {...props}>
        {isLoading ? <Loading size="sm" /> : props.children}
      </button>
    );
  }
}
