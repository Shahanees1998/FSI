import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import Link from "next/link";

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

export const PORTAL_FILTER_FORM_CLASS = "grid mb-0";

export const PORTAL_FILTER_LABEL_CLASS = "block mb-2 text-sm font-medium text-700";

/** Apply filters + Reset row — compact, right-aligned */
export const PORTAL_FILTER_ACTIONS_CLASS =
  "col-12 flex gap-2 align-items-center justify-content-end portal-filter-actions";

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

export function PortalFilterSelect({
  className = "",
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="portal-filter-select-wrap">
      <select
        className={`portal-filter-select p-inputtext p-component w-full ${className}`.trim()}
        {...rest}
      >
        {children}
      </select>
      <i className="pi pi-chevron-down portal-filter-select-icon" aria-hidden />
    </div>
  );
}

type PortalFilterInputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputType?: "search" | "text";
};

export function PortalFilterInput({ className = "", inputType = "text", ...rest }: PortalFilterInputProps) {
  return (
    <input
      type={inputType}
      className={`portal-filter-input p-inputtext p-component w-full ${className}`.trim()}
      {...rest}
    />
  );
}

export function PortalFilterActions({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${PORTAL_FILTER_ACTIONS_CLASS} ${className}`.trim()}>{children}</div>;
}

export function PortalFilterApplyButton({ label = "Apply filters" }: { label?: string }) {
  return (
    <button type="submit" className="p-button p-component p-button-sm p-button-outlined portal-filter-btn">
      <span className="p-button-label">{label}</span>
    </button>
  );
}

export function PortalFilterResetLink({ href, label = "Reset" }: { href: string; label?: string }) {
  return (
    <Link href={href} className="p-button p-component p-button-sm p-button-text portal-filter-btn no-underline">
      <span className="p-button-label">{label}</span>
    </Link>
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
