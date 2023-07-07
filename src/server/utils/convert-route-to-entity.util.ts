const mapping: Record<string, string> = {
  professors: 'professor',
  students: 'student',
  universities: 'university',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
