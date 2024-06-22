import { cn } from "@/lib/utils";

interface RulesCountProps {
  className?: string;
  count: number;
}

export const RulesCount = ({ className, count }: RulesCountProps) => {
  return (
    <span
      className={cn(
        "flex-shrink-0 rounded-full bg-slate-100 px-[6px] py-[2px] text-[10px] font-bold text-slate-400",
        className,
      )}
    >
      {count} {count === 0 || count > 1 ? "RULES" : "RULE"}
    </span>
  );
};
