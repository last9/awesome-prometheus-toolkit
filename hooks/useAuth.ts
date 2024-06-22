import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function useAuth() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>();
  const [promUrl, setPromUrl] = useLocalStorage("prometheus_server_url", "");
  const [promUsername, setPromUsername] = useLocalStorage("prometheus_server_username", "");
  const [promPassword, setPromPassword] = useLocalStorage("prometheus_server_password", "");

  useEffect(() => {
    setReady(true);
  }, [loggedIn]);

  useEffect(() => {
    setLoggedIn(!!promUrl);
  }, [promUrl]);

  return {
    loggedIn,
    ready,
    promUrl,
    setPromUrl,
    setPromUsername,
    setPromPassword,
    promUsername,
    promPassword,
  };
}
