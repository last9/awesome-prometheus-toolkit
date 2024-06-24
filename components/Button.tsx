import { ReactNode } from "react";
import { LoadingDots } from "@/components/LoadingDots";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  onClick: () => void;
}

export const Button = ({
  className,
  children,
  disabled = false,
  icon,
  loading = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex h-8 cursor-pointer items-center justify-center rounded-[4px] px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:bg-blue-500/50",
        loading ? "bg-blue-500/50 hover:bg-blue-500/50" : "bg-blue-500 hover:bg-blue-600",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {loading ? <LoadingDots className="ml-2" /> : false}
      {icon ? icon : null}
    </button>
  );
};
