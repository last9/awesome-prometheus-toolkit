import { cn } from "@/lib/utils";

interface TabProps {
  active: boolean;
  onClick: () => void;
  title: string;
  textClassName?: string;
}

export const Tab = ({ active, title, onClick, textClassName }: TabProps) => {
  return (
    <div className="flex select-none flex-col justify-between">
      <p
        className={cn(
          "cursor-pointer pb-1 text-center text-sm font-medium",
          active ? "text-slate-600" : "text-slate-500",
          textClassName,
        )}
        onClick={onClick}
      >
        {title}
      </p>

      <div className={cn(active ? "h-[3px] bg-blue-500" : "h-[3px] bg-slate-200")} />
    </div>
  );
};
