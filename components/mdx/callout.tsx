import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "tip" | "warning";
  title?: string;
}

export function Callout({
  children,
  type = "note",
  title,
}: CalloutProps) {
  const callout = {
    note: { icon: Info, title: "Note" },
    tip: { icon: CheckCircle2, title: "Tip" },
    warning: { icon: AlertTriangle, title: "Warning" },
  };
  const { icon: Icon, title: defaultTitle } = callout[type];

  return (
    <aside className="mdx-callout" data-type={type} aria-label={title || defaultTitle}>
      <Icon className="mdx-callout__icon" aria-hidden="true" />
      <div>
        <p className="mdx-callout__title">{title || defaultTitle}</p>
        <div className="mdx-callout__body">{children}</div>
      </div>
    </aside>
  );
}
