import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface AptLogoProps {
  className?: string;
}

export default function AptLogo({ className }: AptLogoProps) {
  const router = useRouter();

  return (
    <Image
      alt="APT logo"
      className={cn("h-auto w-auto cursor-pointer", className)}
      onClick={() => router.push("/")}
      priority
      src="/logo.svg"
      height={0}
      width={0}
    />
  );
}
