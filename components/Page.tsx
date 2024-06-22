"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tab } from "@/components/Tab";

interface PageProps {
  path: string;
  title: string;
}

export const Page = ({ path, title }: PageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return <Tab active={path === pathname} onClick={() => router.replace(path)} title={title} />;
};
