'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import { RoleGuard } from '@/components/role-guard';
import { councilService, saveCouncilSections, subscribeCouncilSections } from '@/src/modules/council/services/council.service';
import type { CouncilMember, CouncilSection } from '@/src/modules/council/types/council';

const fallbackSections = councilService.getSections();

export default function AdminCouncilPage() {
  return <RoleGuard role={['admin']}><CouncilManager /></RoleGuard>;
}

function CouncilManager() {
  const [sections, setSections] = useState<CouncilSection[]>(fallbackSections);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [memberIndex, setMemberIndex] = useState(0);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => subscribeCouncilSections(fallbackSections, (items) => setSections(items), console.error), []);

  const selectedSection = sections[sectionIndex];
  const selectedMember = selectedSection?.items[memberIndex];

  const updateMember = (patch: Partial<CouncilMember>) => {
    setSections((current) => current.map((section, sIndex) => sIndex !== sectionIndex ? section : {
      ...section,
      items: section.items.map((member, mIndex) => mIndex === memberIndex ? { ...member, ...patch } : member),
    }));
  };

  const addMember = () => {
    setSections((current) => current.map((section, index) => index === sectionIndex ? {
      ...section,
      items: [...section.items, { name: 'New Council Member', role: 'Member', photo: '/logos/lion.png', biography: '', gallery: [] }],
    } : section));
    setMemberIndex(selectedSection?.items.length ?? 0);
  };

  const removeMember = () => {
    if (!selectedMember || !window.confirm(`Remove ${selectedMember.name}?`)) return;
    setSections((current) => current.map((section, index) => index === sectionIndex ? {
      ...section,
      items: section.items.filter((_, mIndex) => mIndex !== memberIndex),
    } : section));
    setMemberIndex(0);
  };

  const save = async () => {
    setSaving(true); setStatus('');
    try { await saveCouncilSections(sections); setStatus('Council content saved successfully.'); }
    catch (error) { console.error(error); setStatus('Failed to save council content.'); }
    finally { setSaving(false); }
  };

  const sectionNames = useMemo(() => sections.map((section) => section.title), [sections]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="heading-serif text-3xl font-bold">Council Content</h1>
        <p className="text-sm opacity-70">This editor controls the same Council dataset used by the public website. The bundled JSON remains a safe fallback if Firestore is unavailable.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="glass rounded-2xl p-4 space-y-2">
          {sectionNames.map((title, index) => (
            <button key={title} onClick={() => { setSectionIndex(index); setMemberIndex(0); }} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${sectionIndex === index ? 'bg-burgundy text-white' : 'hover:bg-white/10'}`}>{title}</button>
          ))}
        </aside>

        <section className="glass rounded-2xl p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">{selectedSection?.title}</h2>
              <p className="text-xs opacity-60">{selectedSection?.items.length ?? 0} members</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={addMember} className="btn-secondary rounded-lg px-3 py-2 text-sm font-semibold">Add member</button>
              <button type="button" onClick={save} disabled={saving} className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50">{saving ? 'Saving…' : 'Save changes'}</button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {selectedSection?.items.map((member, index) => (
              <button key={`${member.name}-${index}`} onClick={() => setMemberIndex(index)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${memberIndex === index ? 'border-gold bg-gold/15' : 'border-white/15'}`}>{member.name}</button>
            ))}
          </div>

          {selectedMember && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" value={selectedMember.name} onChange={(value) => updateMember({ name: value })} />
              <Field label="Role" value={selectedMember.role || ''} onChange={(value) => updateMember({ role: value })} />
              <Field label="Photo URL / path" value={selectedMember.photo || ''} onChange={(value) => updateMember({ photo: value })} />
              <Field label="Gallery URLs (one per line)" value={(selectedMember.gallery || []).join('\n')} onChange={(value) => updateMember({ gallery: value.split('\n').map((item) => item.trim()).filter(Boolean) })} multiline />
              <div className="md:col-span-2"><Field label="Biography (HTML supported for existing content)" value={selectedMember.biography || ''} onChange={(value) => updateMember({ biography: value })} multiline tall /></div>
              <div className="md:col-span-2 flex justify-between gap-3">
                <button type="button" onClick={removeMember} className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400">Remove member</button>
                {status && <p className="text-sm opacity-75">{status}</p>}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, tall = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; tall?: boolean }) {
  return <label className="space-y-1.5 text-sm"><span className="font-medium">{label}</span>{multiline ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={tall ? 14 : 5} className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2" /> : <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2" />}</label>;
}
