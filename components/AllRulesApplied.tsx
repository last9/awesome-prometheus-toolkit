import Image from "next/image";

export const AllRulesApplied = () => {
  return (
    <div className="my-4 flex flex-1 flex-col items-center justify-center rounded-lg bg-emerald-50">
      <Image
        alt="green tick"
        className="h-auto w-6"
        priority
        src="/green-tick.svg"
        height={0}
        width={0}
      />

      <div className="mt-3 flex flex-col space-y-2">
        <p className="whitespace-pre-line text-center text-xs text-emerald-500">
          {"Looks like all our recommendations have\nbeen applied! No new ones as of now."}
        </p>
      </div>
    </div>
  );
};
