"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import useAlerts from "@/hooks/queries/useAlerts";
import useDiscovery from "@/hooks/queries/useDiscovery";
import usePrometheusQuery from "@/hooks/queries/usePrometheusQuery";
import useRules from "@/hooks/queries/useRules";
import useAuth from "@/hooks/useAuth";
import AptLogo from "@/components/AptLogo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Loader } from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, withProtocol } from "@/lib/utils";

const sourceUrl =
  "https://github.com/samber/awesome-prometheus-alerts?tab=License-1-ov-file#readme";

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?localhost|([a-zA-Z0-9]+[a-zA-Z0-9-]*\.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;

export default function Home() {
  useAlerts();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authFields, setAuthFields] = useState<boolean | "indeterminate">(false);
  const { loggedIn, ready, setPromUrl, setPromUsername, setPromPassword } = useAuth();

  const {
    data: server,
    error: serverError,
    isLoading: connecting,
    refetch: connectWithPrometheus,
  } = usePrometheusQuery({
    enabled: false,
    url: withProtocol(url),
    query: "up",
    username: authFields ? username : null,
    password: authFields ? password : null,
  });

  const {
    data: discovery,
    error: discoveryError,
    isLoading: discovering,
  } = useDiscovery({
    enabled: !!server,
    url: withProtocol(url),
    username: authFields ? username : null,
    password: authFields ? password : null,
  });

  const { data: rules, isLoading: gettingRules } = useRules({
    enabled: !!discovery && discovery.length !== 0,
    url: withProtocol(url),
    username: authFields ? username : null,
    password: authFields ? password : null,
  });

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url.match(urlRegex) && !(connecting || discovering || gettingRules)) {
      connect();
    }
  };

  const connect = () => {
    connectWithPrometheus();
  };

  useEffect(() => {
    if (ready && loggedIn) {
      router.replace("/home");
    }
  }, [loggedIn, ready, router]);

  useEffect(() => {
    if (server && discovery?.length !== 0 && rules) {
      setPromUrl(withProtocol(url));
      setPromUsername(username);
      setPromPassword(password);
      router.push("/home");
    }
  }, [
    server,
    password,
    router,
    url,
    username,
    discovery,
    rules,
    setPromUrl,
    setPromUsername,
    setPromPassword,
  ]);

  if (!ready) {
    return (
      <Container className="mx-6 flex-1 items-center justify-center py-6 md:mx-60 md:py-12">
        <Loader />
      </Container>
    );
  }

  return (
    <Container className="flex-1 items-center py-20 md:mx-60 md:my-12 md:rounded-lg md:border md:border-slate-200 md:px-40">
      <AptLogo className="h-[72px] w-[123px]" />

      <div className="mt-3 flex flex-col">
        <p className="whitespace-pre-line text-center font-bold text-slate-500">
          {"The most apt alert rules toolkit for\nyour Prometheus setup."}
        </p>

        <div className="mt-3 flex flex-col items-center space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <div className="flex h-16 w-[205px] items-center justify-center rounded-[4px] bg-slate-50">
            <p className="p-4 text-center text-xs font-bold text-slate-500">
              Get alert rule recommendations.
            </p>
          </div>

          <div className="flex h-16 w-[205px] items-center justify-center rounded-[4px] bg-slate-50">
            <p className="p-4 text-center text-xs font-bold text-slate-500">
              Browse the alert rule library.
            </p>
          </div>

          <div className="flex h-16 w-[205px] items-center justify-center rounded-[4px] bg-slate-50">
            <p className="p-4 text-center text-xs font-bold text-slate-500">
              Simplify setting up Prometheus.
            </p>
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-medium text-slate-400">
          a companion project to{" "}
          <span className="cursor-pointer" onClick={() => window.open(sourceUrl, "_blank")}>
            awesome-prometheus-alerts
          </span>
        </p>
      </div>

      <div className="mt-[74px] flex flex-col items-center">
        <Image
          alt="file"
          className="h-[21px] w-[21px]"
          priority
          src="/file.svg"
          width={0}
          height={0}
        />

        <p className="mt-2 whitespace-pre-line text-center text-xs font-normal text-slate-600">
          {`To get started, provide your local or\nproduction Prometheus read URL.`}
        </p>

        <div className="mt-3 flex w-[100px] flex-col space-y-3 md:w-[400px]">
          <Input
            className="text-center text-sm"
            containerClassName="h-11 text-center shadow-sm"
            disabled={connecting || discovering || gettingRules}
            placeholder="Enter your Prometheus read URL"
            value={url}
            onChange={(e) => setUrl(e.target.value.replaceAll(" ", ""))}
            onKeyDown={onEnter}
          />

          {authFields ? (
            <div className="flex space-x-3">
              <Input
                className="text-center text-sm"
                containerClassName="h-11 w-[300px] text-center shadow-sm"
                disabled={connecting || discovering || gettingRules}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={onEnter}
              />

              <Input
                className="text-center text-sm"
                containerClassName="h-11 w-[300px] text-center shadow-sm"
                disabled={connecting || discovering || gettingRules}
                placeholder="Enter password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onEnter}
              />
            </div>
          ) : null}

          <div
            className={cn(
              "flex items-center justify-center space-x-[6px]",
              connecting || discovering || gettingRules ? "opacity-50" : "opacity-100",
            )}
          >
            <Checkbox
              checked={authFields}
              className="border-slate-400"
              disabled={connecting || discovering || gettingRules}
              onCheckedChange={(value) => setAuthFields(value)}
            />

            <label htmlFor="check" className="select-none text-xs font-normal text-slate-400">
              use username and password
            </label>
          </div>

          <Button
            className="self-center text-xs text-white"
            disabled={!url.match(urlRegex)}
            loading={connecting || discovering || gettingRules}
            onClick={connect}
          >
            {connecting
              ? "CONNECTING"
              : discovering
                ? "IDENTIFYING COMPONENTS"
                : gettingRules
                  ? "BUILDING RECOMMENDATIONS"
                  : serverError
                    ? "TRY AGAIN"
                    : "CONNECT"}
          </Button>
        </div>

        {serverError?.cause || discoveryError?.cause ? (
          <p className="mt-3 text-xs text-[#F87171]">
            {serverError?.message || discoveryError?.message}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
