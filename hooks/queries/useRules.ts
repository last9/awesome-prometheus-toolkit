import { useQuery } from "@tanstack/react-query";
import { ApiError, UseRulesResponse } from "@/lib/types";

interface UseRulesProps {
  enabled: boolean;
  url: string;
  username: string | null;
  password: string | null;
}

export default function useRules(params: UseRulesProps) {
  const { enabled, url, username, password } = params || {};

  return useQuery({
    queryKey: ["rules", url, username, password],
    queryFn: () => {
      return fetch("/api/rules", {
        method: "POST",
        body: JSON.stringify({ url, username, password }),
      })
        .then((res) => res.json())
        .then((response: UseRulesResponse) => {
          if (response.status === "error") {
            throw response;
          }
          return response.data.groups.map((group) => group.rules).flat();
        })
        .catch((error: ApiError) => {
          throw new Error(error.reason, { cause: error.code });
        });
    },
    enabled: enabled && url !== null && url !== undefined && url !== "",
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
