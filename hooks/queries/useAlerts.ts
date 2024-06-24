import { useQuery } from "@tanstack/react-query";
import { ApiError, UseAlertsResponse } from "@/lib/types";

export default function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: () => {
      return fetch("/api/alerts")
        .then((res) => res.json())
        .then((response: UseAlertsResponse) => {
          if (response.status === "error") {
            throw response;
          }
          return response.data.alerts;
        })
        .catch((error: ApiError) => {
          throw new Error(error.reason, { cause: error.code });
        });
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
