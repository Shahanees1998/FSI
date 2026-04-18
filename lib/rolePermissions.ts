export enum UserRole {
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  CARRIER = "CARRIER",
}

export type PortalSection =
  | "dashboard"
  | "messages"
  | "commissions"
  | "tickets"
  | "profile"
  | "agents"
  | "carriers"
  | "companies"
  | "insurerStats"
  | "settings";

export interface RolePermissions {
  homePath: string;
  allowedPrefixes: string[];
  sections: PortalSection[];
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  [UserRole.ADMIN]: {
    homePath: "/admin",
    allowedPrefixes: ["/admin", "/api/admin", "/api/dashboard", "/api/commissions", "/api/tickets", "/api/conversations", "/api/notifications", "/api/users"],
    sections: ["dashboard", "agents", "carriers", "companies", "messages", "commissions", "tickets", "insurerStats", "settings", "profile"],
  },
  [UserRole.AGENT]: {
    homePath: "/agent",
    allowedPrefixes: [
      "/agent",
      "/api/agent",
      "/api/dashboard",
      "/api/commissions",
      "/api/tickets",
      "/api/conversations",
      "/api/notifications",
      "/api/users",
    ],
    sections: ["dashboard", "messages", "commissions", "tickets", "profile"],
  },
  [UserRole.CARRIER]: {
    homePath: "/carrier",
    allowedPrefixes: ["/carrier", "/api/dashboard", "/api/tickets", "/api/conversations", "/api/notifications", "/api/users"],
    sections: ["dashboard", "messages", "tickets", "profile"],
  },
};

export function getRolePermissions(role?: string | null): RolePermissions | null {
  if (!role) return null;
  const normalized = String(role).trim().toUpperCase() as UserRole;
  return ROLE_PERMISSIONS[normalized] ?? null;
}

export function getDefaultRedirectPath(role?: string | null): string {
  return getRolePermissions(role)?.homePath ?? "/auth/login";
}

export function isAdminRole(role?: string | null): boolean {
  return String(role ?? "").trim().toUpperCase() === UserRole.ADMIN;
}

export function canAccessPath(role: string | undefined, pathname: string): boolean {
  const permissions = getRolePermissions(role);
  if (!permissions) return false;

  return permissions.allowedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function canAccessSection(role: string | undefined, section: PortalSection): boolean {
  const permissions = getRolePermissions(role);
  return permissions?.sections.includes(section) ?? false;
}
