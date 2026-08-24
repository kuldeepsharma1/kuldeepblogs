import { Children, type CSSProperties, type ReactNode } from "react";

export interface ArchitectureBranch {
  name: string;
  description: string;
  variant: "ubuntu" | "rhel";
  topics: string[];
}

export function ArchitectureDiagram({
  title,
  root,
  branches,
  children,
}: {
  title: string;
  root: string;
  branches?: ArchitectureBranch[];
  children?: ReactNode;
}) {
  const branchCount = branches?.length || Children.count(children);
  if (branchCount === 0) return null;

  const branchStyle = {
    "--architecture-edge": `${50 / branchCount}%`,
    gridTemplateColumns: `repeat(${branchCount}, minmax(0, 1fr))`,
  } as CSSProperties;

  return (
    <figure className="architecture-diagram" aria-label={title}>
      <figcaption className="architecture-diagram__caption">
        <span className="architecture-diagram__eyebrow">Architecture</span>
        <span className="architecture-diagram__title">{title}</span>
      </figcaption>

      <div className="architecture-diagram__root-track">
        <div className="architecture-diagram__root">
          <span className="architecture-diagram__root-label">Host system</span>
          <strong>{root}</strong>
        </div>
        <span
          className="architecture-diagram__root-connector"
          aria-hidden="true"
        />
      </div>

      <div
        className="architecture-diagram__branches"
        style={branchStyle}
        role="group"
        aria-label="Available environments"
      >
        <span className="architecture-diagram__bus" aria-hidden="true" />
        {branches
          ? branches.map((branch) => (
              <EnvironmentCard
                key={branch.name}
                {...branch}
                topics={branch.topics.map((topic) => (
                  <TopicNode key={topic}>{topic}</TopicNode>
                ))}
              />
            ))
          : children}
      </div>
    </figure>
  );
}

export function EnvironmentCard({
  name,
  description,
  variant,
  topics,
  children,
}: {
  name: string;
  description: string;
  variant: ArchitectureBranch["variant"];
  topics?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className="architecture-diagram__branch"
      data-variant={variant}
      aria-label={name}
    >
      <span className="architecture-diagram__branch-connector" aria-hidden="true" />
      <span className="architecture-diagram__branch-kicker">
        {variant === "ubuntu" ? "Ubuntu environment" : "Enterprise environment"}
      </span>
      <h3 className="architecture-diagram__branch-title">{name}</h3>
      <p className="architecture-diagram__branch-description">{description}</p>
      <ul className="architecture-diagram__topics">{children ?? topics}</ul>
    </section>
  );
}

export function TopicNode({ children }: { children: ReactNode }) {
  return <li className="architecture-diagram__topic">{children}</li>;
}
