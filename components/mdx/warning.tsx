import { Callout } from "@/components/mdx/callout";

export function Warning({ children }: { children: React.ReactNode }) {
  return <Callout type="warning">{children}</Callout>;
}
