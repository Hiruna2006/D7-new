'use client';

import Link from 'next/link';
import { RoleGuard } from '@/components/role-guard';
import { getAdminNavigation } from '@/src/modules/admin/services/admin-navigation.service';

const ADMIN_LINKS = getAdminNavigation();


export default function AdminHome() {
  return (
    <RoleGuard role={['admin', 'trainer']}>
      <div className="space-y-8">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-rose/10 p-6 shadow-adminGold">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 className="heading-serif text-3xl font-bold">Admin Dashboard</h1>
              <p className="max-w-2xl text-sm opacity-80">
                Access mission-critical tools for maintaining district content, training resources, monthly highlights, and newsletters. Each workspace includes draft-safe editing, intuitive validation, and quick links to published stories.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              All systems operational
            </div>
          </div>
        </header>

        <nav aria-label="Admin sections">
          <ul className="grid gap-4 lg:grid-cols-2">
            {ADMIN_LINKS.map(({ href, label, description }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-200 hover:border-burgundy/40 hover:bg-white/10 hover:shadow-adminBurgundy"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight">{label}</h2>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy/20 text-base text-burgundy transition group-hover:bg-burgundy group-hover:text-white"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-sm opacity-70">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </RoleGuard>
  );
}