"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import useAlerts from "@/hooks/queries/useAlerts";
import Fuse, { IFuseOptions } from "fuse.js";
import { AlertGroup } from "@/components/AlertGroup";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Loader } from "@/components/Loader";
import { Alert, Component } from "@/lib/types";

const fuseOptions = {
  threshold: 0.3,
  includeMatches: true,
  keys: ["group", "components.name"],
} satisfies IFuseOptions<Alert>;

export default function Browse() {
  const { data: alerts, isLoading } = useAlerts();
  const [searchPattern, setSearchPattern] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [alertsList, setAlertsList] = useState<Alert[] | null>(null);
  const fuse = useMemo(() => new Fuse<Alert>(alerts || [], fuseOptions), [alerts]);

  // To focus on search when '/' key is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // To fuzzy search through alert groups and components
  useEffect(() => {
    if (searchPattern) {
      const results = fuse.search(searchPattern);

      const alertList = results.map((result) => {
        const components: Component[] = [];

        result.matches?.map((match) => {
          if (match.key === "components.name") {
            const component = result.item.components.at(match.refIndex || 0);

            if (component) {
              components.push(component);
            }
          }
        });

        return {
          group: result.item.group,
          components,
        };
      });

      setAlertsList(alertList);
    } else {
      setAlertsList(alerts || []);
    }
  }, [alerts, fuse, searchPattern]);

  if (isLoading) {
    return (
      <Container className="mx-6 flex-1 items-center justify-center py-6 md:mx-60 md:py-12">
        <Loader />
      </Container>
    );
  }

  return (
    <Container className="mx-6 overflow-scroll py-6 md:mx-60 md:py-12">
      <p className="pb-4 text-xl font-medium text-slate-600">Browse Library</p>

      <Input
        containerClassName="mb-4 flex-shrink-0"
        ref={searchRef}
        left={<Image alt="search" className="h-auto w-3" src="/search.svg" width={0} height={0} />}
        right={
          <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center self-center rounded-sm border border-slate-100 bg-slate-50">
            <p className="text-[10px] font-bold text-slate-500">/</p>
          </div>
        }
        onChange={(e) => setSearchPattern(e.target.value)}
        placeholder="Search for a component"
        value={searchPattern}
      />

      <div className="flex flex-col space-y-6">
        {alertsList
          ? alertsList.map((alert, index) => (
              <AlertGroup
                components={alert.components}
                group={alert.group}
                key={`${alert.group}-${index}`}
              />
            ))
          : null}
      </div>
    </Container>
  );
}
