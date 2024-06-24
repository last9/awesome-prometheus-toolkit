import Image from "next/image";
import { toast } from "sonner";
import { Rule } from "@/lib/types";
import { getYaml, sanitiseDescription } from "@/lib/utils";

interface YamlViewProps {
  rule: Rule;
}

export const YamlView = ({ rule }: YamlViewProps) => {
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col overflow-scroll rounded-[4px] bg-slate-50 py-6 pl-4">
        <span className="text-nowrap font-mono text-xs font-normal">
          <span>-</span>&nbsp;
          <span className="text-yaml-key">alert: </span>
          <span className="text-yaml-value">{rule.alert}</span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;
          <span className="text-yaml-key">expr: </span>
          <span className="text-yaml-value">{rule.expr}</span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;
          <span className="text-yaml-key">for: </span>
          <span className="text-yaml-value">{rule.for}</span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;
          <span className="text-yaml-key">labels: </span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-yaml-key">severity: </span>
          <span className="text-yaml-value">{rule.labels.severity}</span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;
          <span className="text-yaml-key">annotations: </span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-yaml-key">summary: </span>
          <span className="text-yaml-value">{rule.annotations.summary}</span>
        </span>

        <span className="text-nowrap font-mono text-xs font-normal">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-yaml-key">description: </span>
          <span className="text-yaml-value">
            {sanitiseDescription(rule.annotations.description)}
          </span>
        </span>
      </div>

      <div
        className="absolute right-0 top-0 flex h-8 w-[66px] cursor-pointer select-none items-center justify-center space-x-1 rounded-bl-[4px] rounded-tr-[4px] bg-slate-100 hover:bg-slate-200"
        onClick={() => {
          toast.success("Copied to clipboard");
          navigator.clipboard.writeText(getYaml(rule));
        }}
      >
        <Image alt="copy" src="/copy.svg" width={12} height={12} />
        <span className="text-[10px] font-bold text-slate-500">COPY</span>
      </div>
    </div>
  );
};
