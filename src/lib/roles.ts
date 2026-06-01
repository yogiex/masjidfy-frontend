export const ROLES = {
  JAMAah: 'jamaah',
  PETUGAS_QURBAN: 'petugas_qurban',
  PETUGAS_ZAKAT: 'petugas_zakat',
  BENDAHARA: 'bendahara',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
  PENULIS: 'penulis',
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

/**
 * Periksa apakah user memiliki role tertentu.
 * @param userRoles - Array role dari user (bentuk { role: { name: string } }[])
 * @param requiredRole - Nama role yang dibutuhkan
 */
export function hasRole(
  userRoles: { role: { name: string } }[] | undefined,
  requiredRole: string
): boolean {
  if (!userRoles) return false;
  return userRoles.some((r) => r.role.name === requiredRole);
}

/**
 * Periksa apakah user memiliki setidaknya satu dari role yang diberikan.
 */
export function hasAnyRole(
  userRoles: { role: { name: string } }[] | undefined,
  requiredRoles: string[]
): boolean {
  if (!userRoles) return false;
  return requiredRoles.some((role) => hasRole(userRoles, role));
}