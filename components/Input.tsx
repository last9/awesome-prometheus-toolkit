import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, left, right, className, containerClassName, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <div
        className={cn(
          "flex h-8 justify-between space-x-[6px] overflow-hidden rounded-[4px] px-3",
          focused ? "border border-slate-500" : "border border-slate-200",
          disabled ? "bg-slate-50" : "bg-white",
          containerClassName,
        )}
      >
        {left ? left : null}

        <input
          className={cn(
            "flex w-full flex-1 text-xs font-medium text-slate-500 placeholder:font-normal focus:outline-none",
            className,
            disabled ? "bg-slate-50" : "bg-white",
          )}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={ref}
          {...props}
        />

        {right ? right : null}
      </div>
    );
  },
);
Input.displayName = "Input";
