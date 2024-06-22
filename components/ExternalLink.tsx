"use client";

import Image from "next/image";

interface ExternalLinkProps {
  image: string;
  link?: string;
  title: string;
}

export const ExternalLink = ({ image, link, title }: ExternalLinkProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="flex cursor-pointer space-x-[6px]" onClick={handleClick}>
      <Image alt={title} className="h-auto w-[17px]" priority src={image} width={0} height={0} />
      <p className="text-xs font-medium text-slate-500">{title}</p>
    </div>
  );
};
