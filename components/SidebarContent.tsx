import { useEffect, useMemo, useState } from "react";
import { AllRulesApplied } from "@/components/AllRulesApplied";
import { Divider } from "@/components/Divider";
import { NoAppliedRules } from "@/components/NoAppliedRules";
import { RuleCard } from "@/components/RuleCard";
import { RulesCount } from "@/components/RulesCount";
import { Tab } from "@/components/Tab";
import { Component, PrometheusRule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarContentProps {
  component: Component;
  rules: PrometheusRule[];
}

export const SidebarContent = ({ component, rules }: SidebarContentProps) => {
  const [tab, setTab] = useState<"recommended" | "applied">("recommended");

  const applied = useMemo(() => {
    return component.rules.filter((rule1) => rules.find((rule2) => rule1.yml.alert === rule2.name));
  }, [component.rules, rules]);

  const recommended = useMemo(() => {
    return component.rules.filter(
      (rule1) => !applied.find((rule2) => rule1.yml.alert === rule2.yml.alert),
    );
  }, [applied, component.rules]);

  return (
    <div className="flex h-[calc(100vh-180px)] flex-1 flex-col overflow-hidden">
      <div className="flex flex-col space-y-[2px] pb-6">
        <p className="text-xl font-medium text-slate-600">{component.name}</p>

        <div className="flex items-center space-x-2">
          <RulesCount className="font-semibold text-slate-500" count={component.rules.length} />

          <p className="text-xs font-medium text-slate-400">
            {recommended.length} recommended,
            <span> {applied.length} applied</span>
          </p>
        </div>
      </div>

      <div className="flex items-end">
        <Tab
          active={tab === "recommended"}
          onClick={() => setTab("recommended")}
          textClassName={cn(
            "text-xs font-bold",
            tab === "recommended" ? "text-slate-600" : "text-slate-500",
          )}
          title="Recommended"
        />

        <Divider className="w-4" />

        <Tab
          active={tab === "applied"}
          onClick={() => setTab("applied")}
          textClassName={cn(
            "text-xs font-bold",
            tab === "applied" ? "text-slate-600" : "text-slate-500",
          )}
          title="Applied"
        />

        <Divider className="w-full" />
      </div>

      {tab === "recommended" ? (
        recommended.length > 0 ? (
          <div className="flex flex-col space-y-6 overflow-scroll py-6">
            {recommended.map((rule, index) => (
              <RuleCard key={`${rule.yml.alert}-${index}`} number={index + 1} rule={rule} />
            ))}
          </div>
        ) : (
          <AllRulesApplied />
        )
      ) : applied.length > 0 ? (
        <div className="flex flex-col space-y-6 overflow-scroll py-6">
          {applied.map((rule, index) => (
            <RuleCard applied key={`${rule.yml.alert}-${index}`} number={index + 1} rule={rule} />
          ))}
        </div>
      ) : (
        <NoAppliedRules />
      )}
    </div>
  );
};
