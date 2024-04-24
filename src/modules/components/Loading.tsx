import { Loader2 } from "lucide-react";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Loading({ size = "xl" }: Props) {
  const sizes = {
    sm: 20,
    md: 28,
    lg: 44,
    xl: 76,
  };
  return (
    <Loader2
      size={sizes[size]}
      className="text-stone-400 animate-spin mx-auto"
    />
  );
}
