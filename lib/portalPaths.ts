export function getPortalPrefix(role: string) {
  if (role === "ADMIN") {
    return "/admin";
  }

  if (role === "CARRIER") {
    return "/carrier";
  }

  return "/agent";
}
