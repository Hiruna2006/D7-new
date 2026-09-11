"use client";
import React, { useEffect, useState } from 'react';
import { onAuth, getUserProfile, type UserRole } from '../lib/auth';
import { hasRequiredRole } from '@/src/core/auth/access';
import Link from 'next/link';

// UX guard only. Firestore Rules and authenticated server routes remain the security boundary.
export function RoleGuard({ role, children }: { role: UserRole | UserRole[]; children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsub = onAuth(async (fbUser) => {
      if (!fbUser) {
        setAllowed(false);
        setLoading(false);
        return;
      }
      try {
        const profile = await getUserProfile(fbUser.uid);
        setAllowed(hasRequiredRole(profile?.role, role));
      } catch (error) {
        console.error('[RoleGuard] unable to resolve user role', error);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [role]);

  if (loading) return <div className="text-sm opacity-70">Checking access…</div>;
  if (!allowed) {
    return (
      <div className="space-y-3">
        <p className="text-red-500">Access denied. You do not have permission to view this page.</p>
        <Link className="underline" href="/auth/login">Go to Login</Link>
      </div>
    );
  }
  return <>{children}</>;
}
