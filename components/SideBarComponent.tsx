import { ServiceIcon } from "@/components/ServiceIcon";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SideBarComponentProps extends Component {
  active?: boolean;
  onClick?: () => void;
}

export const SideBarComponent = ({ active, name, onClick }: SideBarComponentProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center space-x-2 rounded-[4px] px-2 py-[6px]",
        active ? "bg-slate-100" : "hover:bg-slate-50",
      )}
      onClick={onClick}
    >
      <ServiceIcon color={active ? null : "94A3B8"} className="w-[18px h-[18px]" name={name} />

      <p
        className={cn(
          "line-clamp-1 break-words text-sm",
          active ? "font-semibold text-slate-500" : "font-medium text-slate-400",
        )}
      >
        {name}
      </p>
    </div>
  );
};
