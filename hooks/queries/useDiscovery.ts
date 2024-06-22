import { useQuery } from "@tanstack/react-query";
import { ApiError, UseDiscoveryResponse } from "@/lib/types";

interface UseDiscoveryProps {
  enabled: boolean;
  url: string;
  username: string | null;
  password: string | null;
}

export default function useDiscovery(params: UseDiscoveryProps) {
  const { enabled, url, username, password } = params || {};

  return useQuery({
    queryKey: ["discovery", url, username, password],
    queryFn: () => {
      return fetch("/api/discovery", {
        method: "POST",
        body: JSON.stringify({ url, username, password }),
      })
        .then((res) => res.json())
        .then((response: UseDiscoveryResponse) => {
          if (response.status === "error") {
            throw response;
          }
          return response.data.discovered;
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
