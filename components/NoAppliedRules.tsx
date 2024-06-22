import Image from "next/image";

export const NoAppliedRules = () => {
  return (
    <div className="my-4 flex flex-1 flex-col items-center justify-center rounded-lg bg-slate-50">
      <Image alt="plus" className="h-auto w-3.5" priority src="/plus.svg" height={0} width={0} />

      <div className="mt-3 flex flex-col space-y-2">
        <p className="whitespace-pre-line text-center text-xs text-slate-400">
          {"No rules for this component\nwere found in the config."}
        </p>

        <p className="whitespace-pre-line text-center text-xs text-slate-400">
          {"Apply rules from the Recommended\nsection and they’ll start showing up here."}
        </p>
      </div>
    </div>
  );
};
