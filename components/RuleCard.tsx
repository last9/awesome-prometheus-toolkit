import Image from "next/image";
import { YamlView } from "@/components/YamlView";
import { RuleDetails } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RuleCardProps {
  applied?: boolean;
  number: number;
  rule: RuleDetails;
}

export const RuleCard = ({ applied = false, number, rule }: RuleCardProps) => {
  const formattedNumber = number < 10 ? `0${number}` : number;

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="flex space-x-4">
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
            applied ? "bg-blue-100" : "bg-slate-100",
          )}
        >
          {applied ? (
            <Image
              alt="tick"
              className="h-auto w-4"
              priority
              src="/blue-tick.svg"
              height={0}
              width={0}
            />
          ) : (
            <p className="text-xs font-bold text-slate-500">{formattedNumber}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1 md:hidden">
          <p className="text-sm font-medium text-slate-600">{rule.summary}</p>
          <p className="text-xs font-medium text-slate-500">{rule.description}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 overflow-hidden">
        <div className="hidden md:flex md:flex-col md:space-y-1">
          <p className="text-sm font-medium text-slate-600">{rule.summary}</p>
          <p className="text-xs font-medium text-slate-500">{rule.description}</p>
        </div>

        <YamlView rule={rule.yml} />
      </div>
    </div>
  );
};
