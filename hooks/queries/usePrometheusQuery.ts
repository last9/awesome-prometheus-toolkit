import { useQuery } from "@tanstack/react-query";
import { ApiError, PrometheusQueryProps, PrometheusQueryResponse } from "@/lib/types";

interface UsePrometheusQueryProps extends PrometheusQueryProps {
  enabled: boolean;
}

export default function usePrometheusQuery(params: UsePrometheusQueryProps) {
  const { enabled, url, query, username, password } = params || {};

  return useQuery({
    queryKey: ["prometheus", url, query, username, password],
    queryFn: () => {
      return fetch("/api/prometheus", {
        method: "POST",
        body: JSON.stringify({ url, query, username, password }),
      })
        .then((res) => res.json())
        .then((result: PrometheusQueryResponse) => {
          if (result.status === "error") {
            throw result;
          }
          return result.data.result;
        })
        .catch((error: ApiError) => {
          throw new Error(error.reason, { cause: error.code });
        });
    },
    retry: false,
    enabled: enabled && url !== null && url !== undefined && url !== "",
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
