import { Drawer } from "vaul";
import { RuleCard } from "@/components/RuleCard";
import { RulesCount } from "@/components/RulesCount";
import { ServiceIcon } from "@/components/ServiceIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Component } from "@/lib/types";

export const AlertComponent = ({ name, rules }: Component) => {
  return (
    <div className="flex min-h-[184px] w-full flex-col overflow-hidden rounded-[4px] border border-slate-100 p-6">
      <div className="flex items-center space-x-[10px] pb-[18px]">
        <ServiceIcon name={name} />
        <p className="line-clamp-3 break-words text-sm font-bold text-slate-600">{name}</p>
      </div>

      <p className="mb-4 line-clamp-3 text-wrap break-words text-xs font-medium text-slate-400">
        <RulesCount className="mr-1" count={rules.length} />
        {rules.map((rule) => rule.summary).join(", ")}
      </p>

      <Dialog>
        <div className="hidden md:flex md:flex-1 md:flex-col md:justify-end">
          <DialogTrigger asChild>
            <button
              className="flex h-8 cursor-pointer items-center justify-center rounded-[4px] border border-slate-200 disabled:opacity-60"
              disabled={rules.length === 0}
            >
              <p className="text-xs font-semibold text-slate-600">View Alert Rules</p>
            </button>
          </DialogTrigger>
        </div>

        <DialogContent className="w-[784px]">
          <DialogHeader className="items-center space-x-2 px-6 py-4">
            <ServiceIcon name={name} />
            <DialogTitle>{name}</DialogTitle>
            <RulesCount className="font-semibold" count={rules.length} />
          </DialogHeader>

          <div className="flex h-[500px] flex-col space-y-6 overflow-scroll p-6">
            {rules.map((rule, index) => (
              <RuleCard key={`${rule.yml.alert}-${index}`} number={index + 1} rule={rule} />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Drawer.Root>
        <div className="flex flex-1 flex-col justify-end md:hidden">
          <Drawer.Trigger asChild>
            <div className="flex h-8 cursor-pointer items-center justify-center rounded border border-slate-200">
              <p className="text-xs font-semibold text-slate-600">View Alert Rules</p>
            </div>
          </Drawer.Trigger>
        </div>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-overlay" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 flex h-[85%] flex-col rounded-t-xl bg-white outline-none">
            <div className="mx-auto mt-3 h-1 w-[50px] flex-shrink-0 rounded-full bg-zinc-300" />

            <div className="mx-6 my-4 flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <ServiceIcon name={name} />
                <DialogTitle className="line-clamp-1 text-ellipsis break-all">{name}</DialogTitle>
              </div>

              <RulesCount className="font-semibold" count={rules.length} />
            </div>

            <div className="flex h-px flex-shrink-0 bg-slate-200" />

            <div className="flex flex-col space-y-6 overflow-scroll p-6">
              {rules.map((rule, index) => (
                <RuleCard key={`${rule.yml.alert}-${index}`} number={index + 1} rule={rule} />
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};
