import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Rule } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const withProtocol = (url: string) => {
  if (/^localhost/i.test(url)) {
    return `http://${url}`;
  }
  return !/^https?:\/\//i.test(url) ? `https://${url}` : url;
};

export function sanitiseDescription(description: string) {
  return `"${description.replaceAll(`\n`, `\\n`).replaceAll(`"{{`, `\\"{{`).replaceAll(`}}"`, `}}\\"`)}"`;
}

export function getYaml(rule: Rule) {
  return `
- alert: ${rule.alert}
  expr: ${rule.expr}
  for: ${rule.for}
  labels:
    severity: ${rule.labels.severity}
  annotations:
    summary: ${rule.annotations.summary}
    description: ${sanitiseDescription(rule.annotations.description)}
`.trim();
}
