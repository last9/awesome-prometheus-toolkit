import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex h-5 -translate-y-1 items-center", className)}>
      <div className="animate-loading-dots h-1 w-1 rounded-full bg-white delay-100" />
      <div className="animate-loading-dots mx-1 h-1 w-1 rounded-full bg-white delay-200" />
      <div className="animate-loading-dots h-1 w-1 rounded-full bg-white delay-300" />
    </div>
  );
};
