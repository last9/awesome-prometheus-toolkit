"use client";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="sticky bottom-0 bg-white">
      <div className="h-px bg-slate-100" />

      <div className="mx-6 flex h-14 items-center justify-between md:mx-60">
        <div className="flex space-x-2 md:space-x-4">
          <p
            className="cursor-pointer select-none text-[10px] font-medium text-slate-400 md:text-xs"
            onClick={() =>
              window.open("https://github.com/samber/awesome-prometheus-alerts", "_blank")
            }
          >
            Contribute on GitHub
          </p>
        </div>

        <Link className="flex items-center space-x-2" href="https://last9.io/" target="_blank">
          <p className="text-[10px] font-medium text-slate-400 md:text-xs">Maintained by Last9</p>

          <Image
            alt="icon"
            className="h-auto w-4 md:w-5"
            priority
            src="/last9.svg"
            width={0}
            height={0}
          />
        </Link>
      </div>
    </footer>
  );
};
