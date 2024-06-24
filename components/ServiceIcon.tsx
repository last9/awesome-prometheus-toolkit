"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceIcon {
  color?: string | null;
  className?: string;
  name: string;
}

const errored: string[] = [];

export const ServiceIcon = ({ color, className, name }: ServiceIcon) => {
  const [error, setError] = useState(false);

  const imageUrl = useMemo(() => {
    const serviceName = name.split(" ")[0].toLowerCase();

    if (color) {
      return `https://cdn.simpleicons.org/${serviceName}/${color}`;
    }

    return `https://cdn.simpleicons.org/${serviceName}`;
  }, [color, name]);

  return (
    <Image
      alt="icon"
      className={cn("h-5 w-5", className)}
      priority
      onErrorCapture={() => {
        setError(true);
        errored.push(name);
      }}
      src={errored.includes(name) || error ? "/component.svg" : imageUrl}
      height={0}
      width={0}
    />
  );
};
