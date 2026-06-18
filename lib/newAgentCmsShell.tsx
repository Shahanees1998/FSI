import { ReactNode } from "react";

export function NewAgentShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
      <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
        <p className="text-600 text-sm m-0">
          <span className="font-medium text-800">New Agents</span>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </p>
      </div>
      {children}
    </div>
  );
}
