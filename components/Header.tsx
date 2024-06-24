"use client";

import { usePathname, useRouter } from "next/navigation";
import useGithub from "@/hooks/queries/useGithub";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import AptLogo from "@/components/AptLogo";
import { Divider } from "@/components/Divider";
import { ExternalLink } from "@/components/ExternalLink";
import { Page } from "@/components/Page";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const Header = () => {
  const router = useRouter();
  const { data } = useGithub();
  const { promUrl } = useAuth();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const changeSourcePath = () => {
    queryClient.clear();
    localStorage.clear();
    router.replace("/");
  };

  return (
    <header className={cn("sticky top-0 z-40 bg-white", pathname === "/" ? "hidden" : "visible")}>
      <div className="mx-6 flex h-24 justify-between md:mx-60 md:h-[72px]">
        <AptLogo />

        <div className="hidden md:flex md:items-center md:space-x-8 md:self-end">
          <div className="flex space-x-4">
            <Page path="/home" title="APT Home" />
            <Page path="/library" title="Browse Library" />
          </div>

          <div className="mb-2 flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <ExternalLink image="/file.svg" title="Source Path" />
                </TooltipTrigger>

                <TooltipContent className="z-50 border-0 bg-slate-500 shadow-lg" side="bottom">
                  <TooltipArrow fill="#64748b" />

                  <div className="flex max-w-[300px] justify-center space-x-2">
                    <p className="line-clamp-1 break-all text-xs text-white">{promUrl}</p>

                    <div className="w-px bg-slate-200" />

                    <p
                      className="cursor-pointer text-xs font-semibold text-white"
                      onClick={changeSourcePath}
                    >
                      Edit
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {data?.stargazers_count ? (
              <ExternalLink
                image="/github.svg"
                link="https://github.com/last9/awesome-prometheus-toolkit"
                title={`${data.stargazers_count} stars`}
              />
            ) : null}
          </div>
        </div>
      </div>

      <Divider className="mt-[-1px]" />
    </header>
  );
};
