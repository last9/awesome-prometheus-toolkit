import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn("h-px bg-slate-200", className)} />;
};
