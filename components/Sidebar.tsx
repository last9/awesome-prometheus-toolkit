import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { SideBarComponent } from "@/components/SideBarComponent";
import { Component } from "@/lib/types";

interface SidebarProps {
  components: Component[];
  onSelect: (index: number) => void;
  selected: number;
}

export const Sidebar = ({ components, onSelect, selected }: SidebarProps) => {
  const router = useRouter();

  return (
    <div className="flex w-[160px] flex-shrink-0 flex-col">
      <div className="flex">
        <p className="p-2 text-xs font-bold text-slate-400">DISCOVERED</p>
      </div>

      <div className="flex flex-col pb-4">
        {components.map((component, index) => (
          <SideBarComponent
            {...component}
            active={index === selected}
            key={component.name}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      <Button
        className="flex h-7 w-[98px] cursor-pointer select-none items-center justify-between rounded-[4px] bg-slate-100 pl-[10px] pr-[6px] text-xs font-medium text-slate-500 hover:bg-slate-200"
        icon={
          <Image
            alt="right arrow"
            className="h-auto w-4"
            src="/right-arrow.svg"
            height={0}
            width={0}
          />
        }
        onClick={() => router.push("/library")}
      >
        View more
      </Button>
    </div>
  );
};
