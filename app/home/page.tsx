"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useAlerts from "@/hooks/queries/useAlerts";
import useDiscovery from "@/hooks/queries/useDiscovery";
import useRules from "@/hooks/queries/useRules";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Loader } from "@/components/Loader";
import { Sidebar } from "@/components/Sidebar";
import { SidebarContent } from "@/components/SidebarContent";
import { Component } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const { data: alerts, isLoading: gettingAlerts } = useAlerts();
  const { loggedIn, ready, promUrl, promUsername, promPassword } = useAuth();

  const { data: discovery, isLoading: discovering } = useDiscovery({
    enabled: true,
    url: promUrl,
    username: promUsername,
    password: promPassword,
  });

  const { data: rules, isLoading: gettingRules } = useRules({
    enabled: true,
    url: promUrl,
    username: promUsername,
    password: promPassword,
  });

  const discovered = useMemo(() => {
    const store: Component[] = [];
    const components = alerts?.map((alert) => alert.components).flat() || [];

    discovery?.map((discoveredComponent) => {
      const foundComponent = components.find(
        (component) => component.name === discoveredComponent.component,
      );

      if (foundComponent) {
        store.push(foundComponent);
      }
    });

    return store;
  }, [alerts, discovery]);

  useEffect(() => {
    if (ready && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, ready, router]);

  if (gettingAlerts || discovering || gettingRules || !ready) {
    return (
      <Container className="mx-6 flex-1 items-center justify-center py-6 md:mx-60 md:py-12">
        <Loader />
      </Container>
    );
  }

  return discovered.length > 0 ? (
    <Container className="mx-6 mb-14 h-[calc(100vh-130px)] flex-row space-x-20 pt-6 md:mx-60 md:pt-12">
      {discovered ? (
        <Sidebar components={discovered} onSelect={setSelected} selected={selected} />
      ) : null}

      {discovered[selected] && rules !== undefined ? (
        <SidebarContent component={discovered[selected]} rules={rules} />
      ) : null}
    </Container>
  ) : (
    <Container className="mx-6 flex-1 flex-col items-center justify-center space-y-3 py-6 text-sm md:mx-60 md:py-12">
      <p className="text-center font-medium text-slate-400">
        No services were discovered on this Prometheus server.
      </p>

      <Button
        className="flex h-7 cursor-pointer select-none items-center justify-between rounded-[4px] bg-slate-100 text-xs font-medium text-slate-500 hover:bg-slate-200"
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
        Browse Library
      </Button>
    </Container>
  );
}
