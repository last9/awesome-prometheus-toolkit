import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  mode?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Loader = ({ className, mode = "dark", size = "md" }: LoaderProps) => {
  const getSize = () => {
    if (size === "xs") return "h-2 w-2";
    else if (size === "sm") return "h-4 w-4";
    else if (size === "md") return "h-6 w-6";
    else if (size === "lg") return "h-8 w-8";
    else if (size === "xl") return "h-10 w-10";
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-b-2",
        mode === "light" ? "border-white" : "border-slate-500",
        getSize(),
        className,
      )}
    />
  );
};
