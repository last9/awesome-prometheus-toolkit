import { useQuery } from "@tanstack/react-query";
import { ApiError, GithubResponse } from "@/lib/types";

export default function useGithub() {
  return useQuery({
    queryKey: ["github"],
    queryFn: () => {
      return fetch("https://api.github.com/repos/last9/awesome-prometheus-toolkit")
        .then((res) => res.json())
        .then((response: GithubResponse) => response)
        .catch((error: ApiError) => {
          throw new Error(error.reason, { cause: error.code });
        });
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
