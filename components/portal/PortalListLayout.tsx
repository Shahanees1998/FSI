import type { CSSProperties, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

/**
 * Standard list page pattern (see `/agent/clients`): padded card, header row, `grid` filter form,
 * `overflow-auto` + bordered table, pagination. Use these classes/components anywhere we show
 * filterable record lists so the UI stays consistent.
 *
 * Remaining candidates to migrate: PrimeReact `DataTable` views under reports/, my-business/,
 * scoreboards, contracts wizards, etc.
 */

export const PORTAL_LIST_CARD_CLASS = "surface-card border-round border-1 surface-border p-4";

export const PORTAL_LIST_HEADER_ROW_CLASS =
  "flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4";

export const PORTAL_LIST_TITLE_CLASS = "text-2xl font-semibold m-0 text-900";

export const PORTAL_LIST_SUBTITLE_CLASS = "m-0 mt-2 text-600";

export const PORTAL_FILTER_FORM_CLASS = "grid mb-4";

export const PORTAL_FILTER_LABEL_CLASS = "block mb-2 text-sm font-medium";

/** Apply filters + Reset row (full width under filter fields) */
export const PORTAL_FILTER_ACTIONS_CLASS = "col-12 flex gap-2 align-items-end";

export const PORTAL_LIST_TABLE_WRAP_CLASS = "overflow-auto";

export const portalListTableClassName = "w-full text-sm";

export const portalListTableStyle: CSSProperties = { borderCollapse: "collapse" };

export function PortalListPageCard({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${PORTAL_LIST_CARD_CLASS} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

type PortalListHeaderProps = {
  title: string;
  description?: string;
  /** e.g. “New client” link button */
  actions?: ReactNode;
};

export function PortalListHeader({ title, description, actions }: PortalListHeaderProps) {
  return (
    <div className={PORTAL_LIST_HEADER_ROW_CLASS}>
      <div>
        <h1 className={PORTAL_LIST_TITLE_CLASS}>{title}</h1>
        {description ? <p className={PORTAL_LIST_SUBTITLE_CLASS}>{description}</p> : null}
      </div>
      {actions ? <div className="flex-shrink-0">{actions}</div> : null}
    </div>
  );
}

export function PortalListTable({ children, className = "", ...rest }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table className={`${portalListTableClassName} ${className}`.trim()} style={portalListTableStyle} {...rest}>
      {children}
    </table>
  );
}

export function PortalListTableWrap({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${PORTAL_LIST_TABLE_WRAP_CLASS} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export function PortalListTheadRow({ children }: { children: ReactNode }) {
  return <tr className="text-left border-bottom-1 surface-border">{children}</tr>;
}

export function PortalListTr({ children }: { children: ReactNode }) {
  return <tr className="border-bottom-1 surface-border">{children}</tr>;
}

export function PortalListTh({ children, className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`py-2 pr-3 ${className}`.trim()} {...rest}>
      {children}
    </th>
  );
}

export function PortalListTd({ children, className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`py-2 pr-3 ${className}`.trim()} {...rest}>
      {children}
    </td>
  );
}

export function PortalListThActions({ children }: { children: ReactNode }) {
  return <th className="py-2 pr-3 text-right">{children}</th>;
}

export function PortalListTdActions({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`py-2 pr-0 text-right ${className}`.trim()}>{children}</td>;
}
