import type { UserRole } from '@/lib/auth';

export function hasRequiredRole(currentRole: UserRole | undefined, required: UserRole | readonly UserRole[]): boolean {
  if (!currentRole) return false;
  if (currentRole === 'superadmin') return true;
  const requiredRoles = Array.isArray(required) ? required : [required];
  return requiredRoles.includes(currentRole);
}
