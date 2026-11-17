import { Callout } from "@/components/mdx/callout";

export function Tip({ children }: { children: React.ReactNode }) {
  return <Callout type="tip">{children}</Callout>;
}
