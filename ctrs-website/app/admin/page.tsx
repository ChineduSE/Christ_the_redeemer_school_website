'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  GripVertical, Plus, Pencil, Trash2, Eye, EyeOff, Bell, Calendar,
  LogOut, FileText, ImageIcon, Paperclip, X, Check, AlertTriangle, ChevronLeft,
} from 'lucide-react'
import type { Announcement, CalendarEvent, AnnouncementCategory, CalendarEventType } from '@/types'

const MAX = 7
const CAT_COLORS: Record<AnnouncementCategory, string> = {
  Announcement: 'bg-ctrs-green text-white',
  Achievement: 'bg-ctrs-amber text-white',
  Event: 'bg-ctrs-emerald text-white',
}
const CAT_LIGHT: Record<AnnouncementCategory, string> = {
  Announcement: 'bg-green-50 text-ctrs-green border-ctrs-green/20',
  Achievement: 'bg-amber-50 text-ctrs-amber border-ctrs-amber/20',
  Event: 'bg-emerald-50 text-ctrs-emerald border-ctrs-emerald/20',
}
const EV_COLORS: Record<CalendarEventType, string> = {
  Calendar: 'bg-blue-50 text-blue-600 border-blue-200',
  Event: 'bg-amber-50 text-amber-600 border-amber-200',
  Special: 'bg-purple-50 text-purple-600 border-purple-200',
}

type Tab = 'announcements' | 'calendar'

const BLANK_ANN: Partial<Announcement> = {
  category: 'Announcement', title: '', body: '', excerpt: '',
  is_published: false, is_popup: false,
}
const BLANK_EV: Partial<CalendarEvent> = {
  title: '', description: '', event_date: '', event_end_date: '', event_type: 'Calendar',
}

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('announcements')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  // Modal
  const [modalType, setModalType] = useState<Tab | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [annForm, setAnnForm] = useState<Partial<Announcement>>(BLANK_ANN)
  const [evForm, setEvForm] = useState<Partial<CalendarEvent>>(BLANK_EV)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [docFile, setDocFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: Tab } | null>(null)

  const imageRef = useRef<HTMLInputElement>(null)
  const docRef = useRef<HTMLInputElement>(null)

  // ─── Data loading ───────────────────────────────────────────────
  const loadAnnouncements = useCallback(async () => {
    const res = await fetch('/api/admin/announcements')
    if (res.ok) setAnnouncements(await res.json())
  }, [])

  const loadEvents = useCallback(async () => {
    const res = await fetch('/api/admin/calendar')
    if (res.ok) setEvents(await res.json())
  }, [])

  useEffect(() => {
    setLoading(true)
    Promise.all([loadAnnouncements(), loadEvents()]).finally(() => setLoading(false))
  }, [loadAnnouncements, loadEvents])

  // ─── Logout ─────────────────────────────────────────────────────
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  // ─── Drag & drop reorder ─────────────────────────────────────────
  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    const items = Array.from(announcements)
    const [removed] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, removed)
    const updated = items.map((a, i) => ({ ...a, display_order: i }))
    setAnnouncements(updated)
    await fetch('/api/admin/announcements/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: updated.map(({ id, display_order }) => ({ id, display_order })) }),
    })
  }

  // ─── Inline toggles ─────────────────────────────────────────────
  async function toggleField(id: string, field: 'is_published' | 'is_popup', value: boolean) {
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    })
    if (res.ok) {
      const updated = await res.json()
      if (field === 'is_popup' && value) {
        setAnnouncements((prev) => prev.map((a) => ({ ...a, is_popup: a.id === id })))
      } else {
        setAnnouncements((prev) => prev.map((a) => (a.id === id ? updated : a)))
      }
    }
  }

  // ─── Open modals ────────────────────────────────────────────────
  function openNewAnn() {
    setEditId(null)
    setAnnForm(BLANK_ANN)
    setImageFile(null)
    setDocFile(null)
    setImagePreview(null)
    setFormError('')
    setModalType('announcements')
  }

  function openEditAnn(a: Announcement) {
    setEditId(a.id)
    setAnnForm({ ...a })
    setImageFile(null)
    setDocFile(null)
    setImagePreview(a.image_url)
    setFormError('')
    setModalType('announcements')
  }

  function openNewEv() {
    setEditId(null)
    setEvForm(BLANK_EV)
    setFormError('')
    setModalType('calendar')
  }

  function openEditEv(ev: CalendarEvent) {
    setEditId(ev.id)
    setEvForm({ ...ev })
    setFormError('')
    setModalType('calendar')
  }

  function closeModal() { setModalType(null); setEditId(null) }

  // ─── File pickers ────────────────────────────────────────────────
  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setImageFile(f)
    setImagePreview(URL.createObjectURL(f))
  }

  function onDocChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setDocFile(f)
  }

  // ─── Upload helper ───────────────────────────────────────────────
  async function upload(file: File, bucket: string) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('bucket', bucket)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    return res.json() as Promise<{ url: string; name: string }>
  }

  // ─── Save announcement ───────────────────────────────────────────
  async function saveAnnouncement() {
    if (!annForm.title?.trim()) { setFormError('Title is required'); return }
    if (!annForm.body?.trim()) { setFormError('Body is required'); return }
    setSaving(true)
    setFormError('')
    try {
      let imageUrl = annForm.image_url ?? null
      let documentUrl = annForm.document_url ?? null
      let documentName = annForm.document_name ?? null

      if (imageFile) {
        const r = await upload(imageFile, 'announcement-images')
        imageUrl = r.url
      }
      if (docFile) {
        const r = await upload(docFile, 'announcement-documents')
        documentUrl = r.url
        documentName = r.name
      }

      const excerpt = annForm.excerpt?.trim() || annForm.body!.slice(0, 200).replace(/\n/g, ' ')

      const payload = { ...annForm, image_url: imageUrl, document_url: documentUrl, document_name: documentName, excerpt }

      const url = editId ? `/api/admin/announcements/${editId}` : '/api/admin/announcements'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setFormError(data.error || 'Save failed'); return }

      await loadAnnouncements()
      closeModal()
    } catch (e) {
      setFormError('Unexpected error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ─── Save calendar event ─────────────────────────────────────────
  async function saveEvent() {
    if (!evForm.title?.trim()) { setFormError('Title is required'); return }
    if (!evForm.event_date) { setFormError('Event date is required'); return }
    setSaving(true)
    setFormError('')
    try {
      const url = editId ? `/api/admin/calendar/${editId}` : '/api/admin/calendar'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evForm),
      })
      if (!res.ok) { const d = await res.json(); setFormError(d.error || 'Save failed'); return }
      await loadEvents()
      closeModal()
    } catch {
      setFormError('Unexpected error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ─── Delete ──────────────────────────────────────────────────────
  async function confirmDelete() {
    if (!deleteTarget) return
    const { id, type } = deleteTarget
    const url = type === 'announcements' ? `/api/admin/announcements/${id}` : `/api/admin/calendar/${id}`
    await fetch(url, { method: 'DELETE' })
    if (type === 'announcements') await loadAnnouncements()
    else await loadEvents()
    setDeleteTarget(null)
  }

  // ─── Helpers ─────────────────────────────────────────────────────
  function fmtDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-raleway">

      {/* Top nav */}
      <header className="bg-[#0F2419] border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/images/logo_ctrs.png" alt="CTRS" fill className="object-contain" />
            </div>
            <span className="font-playfair text-white font-bold text-lg hidden sm:block">CTRS Admin</span>
          </div>
          <nav className="flex items-center gap-1">
            {(['announcements', 'calendar'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 flex items-center gap-2 ${
                  tab === t ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}
              >
                {t === 'announcements' ? <Bell size={14} /> : <Calendar size={14} />}
                {t === 'announcements' ? 'Announcements' : 'Calendar'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-white/40 hover:text-white/70 transition-colors text-xs flex items-center gap-1.5"
          >
            <Eye size={13} /> View Site
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 text-white/40 hover:text-red-400 transition-colors text-xs">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-ctrs-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === 'announcements' ? (
          <AnnouncementsTab
            announcements={announcements}
            onNew={openNewAnn}
            onEdit={openEditAnn}
            onDelete={(id) => setDeleteTarget({ id, type: 'announcements' })}
            onToggle={toggleField}
            onDragEnd={handleDragEnd}
            fmtDate={fmtDate}
          />
        ) : (
          <CalendarTab
            events={events}
            onNew={openNewEv}
            onEdit={openEditEv}
            onDelete={(id) => setDeleteTarget({ id, type: 'calendar' })}
            fmtDate={fmtDate}
          />
        )}
      </main>

      {/* Announcement Modal */}
      {modalType === 'announcements' && (
        <Modal title={editId ? 'Edit Announcement' : 'New Announcement'} onClose={closeModal}>
          <AnnForm
            form={annForm}
            setForm={setAnnForm}
            imagePreview={imagePreview}
            docFile={docFile}
            imageRef={imageRef}
            docRef={docRef}
            onImageChange={onImageChange}
            onDocChange={onDocChange}
            onClearImage={() => { setImageFile(null); setImagePreview(null); setAnnForm((f) => ({ ...f, image_url: null })) }}
            onClearDoc={() => { setDocFile(null); setAnnForm((f) => ({ ...f, document_url: null, document_name: null })) }}
            error={formError}
            saving={saving}
            onSave={saveAnnouncement}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {/* Calendar Event Modal */}
      {modalType === 'calendar' && (
        <Modal title={editId ? 'Edit Calendar Event' : 'New Calendar Event'} onClose={closeModal}>
          <EvForm
            form={evForm}
            setForm={setEvForm}
            error={formError}
            saving={saving}
            onSave={saveEvent}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-ctrs-dark mb-2">Confirm Delete</h3>
            <p className="font-opensans text-sm text-ctrs-dark/55 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-ctrs-dark hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════

function AnnouncementsTab({
  announcements, onNew, onEdit, onDelete, onToggle, onDragEnd, fmtDate,
}: {
  announcements: Announcement[]
  onNew: () => void
  onEdit: (a: Announcement) => void
  onDelete: (id: string) => void
  onToggle: (id: string, field: 'is_published' | 'is_popup', val: boolean) => void
  onDragEnd: (r: DropResult) => void
  fmtDate: (d: string) => string
}) {
  const used = announcements.length
  const pct = Math.round((used / MAX) * 100)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-ctrs-dark">Announcements</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 max-w-[160px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${used >= MAX ? 'bg-red-400' : 'bg-ctrs-green'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`font-opensans text-xs font-semibold ${used >= MAX ? 'text-red-400' : 'text-ctrs-dark/50'}`}>
              {used} / {MAX} slots used
            </span>
          </div>
        </div>
        <button
          onClick={onNew}
          disabled={used >= MAX}
          className="flex items-center gap-2 px-4 py-2.5 bg-ctrs-green text-white rounded-lg text-sm font-semibold hover:bg-ctrs-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={15} /> New Announcement
        </button>
      </div>

      {announcements.length === 0 ? (
        <EmptyState icon={<Bell size={28} className="text-ctrs-dark/20" />} message="No announcements yet. Add one to get started." />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="announcements">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {announcements.map((a, index) => (
                  <Draggable key={a.id} draggableId={a.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white rounded-xl border transition-all duration-200 ${
                          snapshot.isDragging ? 'shadow-xl border-ctrs-amber/40 rotate-[0.5deg]' : 'border-gray-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3 p-4">
                          {/* Drag handle */}
                          <div {...provided.dragHandleProps} className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0">
                            <GripVertical size={18} />
                          </div>

                          {/* Image / icon */}
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-ctrs-cream flex items-center justify-center">
                            {a.image_url ? (
                              <img src={a.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={18} className="text-ctrs-dark/20" />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${CAT_COLORS[a.category]}`}>
                                {a.category}
                              </span>
                              <span className="font-opensans text-[11px] text-ctrs-dark/35">
                                {fmtDate(a.created_at)}
                              </span>
                            </div>
                            <p className="font-semibold text-sm text-ctrs-dark truncate">{a.title}</p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <ToggleSwitch
                              value={a.is_published}
                              onChange={(v) => onToggle(a.id, 'is_published', v)}
                              label="Published"
                              onColor="bg-ctrs-green"
                            />
                            <ToggleSwitch
                              value={a.is_popup}
                              onChange={(v) => onToggle(a.id, 'is_popup', v)}
                              label="Popup"
                              onColor="bg-ctrs-amber"
                            />
                            <button onClick={() => onEdit(a)} className="p-1.5 rounded-lg hover:bg-gray-100 text-ctrs-dark/40 hover:text-ctrs-green transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => onDelete(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-ctrs-dark/40 hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-ctrs-dark/35 font-opensans">
        <span className="flex items-center gap-1.5"><GripVertical size={12} /> Drag to reorder</span>
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-ctrs-green" /> Published = visible on site</span>
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-ctrs-amber" /> Popup = show on page load</span>
      </div>
    </div>
  )
}

function CalendarTab({
  events, onNew, onEdit, onDelete, fmtDate,
}: {
  events: CalendarEvent[]
  onNew: () => void
  onEdit: (ev: CalendarEvent) => void
  onDelete: (id: string) => void
  fmtDate: (d: string) => string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-ctrs-dark">Calendar Events</h2>
          <p className="font-opensans text-xs text-ctrs-dark/40 mt-1">{events.length} event{events.length !== 1 ? 's' : ''} · sorted by date</p>
        </div>
        <button onClick={onNew} className="flex items-center gap-2 px-4 py-2.5 bg-ctrs-green text-white rounded-lg text-sm font-semibold hover:bg-ctrs-green/90 transition-all">
          <Plus size={15} /> Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <EmptyState icon={<Calendar size={28} className="text-ctrs-dark/20" />} message="No calendar events yet." />
      ) : (
        <div className="space-y-2">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-ctrs-cream rounded-xl flex flex-col items-center justify-center border border-ctrs-green/15">
                <span className="font-playfair font-bold text-sm text-ctrs-green leading-none">
                  {new Date(ev.event_date + 'T00:00:00').getDate()}
                </span>
                <span className="font-raleway text-[9px] text-ctrs-dark/40 uppercase tracking-wide">
                  {new Date(ev.event_date + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short' })}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${EV_COLORS[ev.event_type]}`}>
                    {ev.event_type}
                  </span>
                </div>
                <p className="font-semibold text-sm text-ctrs-dark truncate">{ev.title}</p>
                {ev.description && (
                  <p className="font-opensans text-xs text-ctrs-dark/45 truncate mt-0.5">{ev.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => onEdit(ev)} className="p-1.5 rounded-lg hover:bg-gray-100 text-ctrs-dark/40 hover:text-ctrs-green transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDelete(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-ctrs-dark/40 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Announcement Form ───────────────────────────────────────────
function AnnForm({
  form, setForm, imagePreview, docFile, imageRef, docRef,
  onImageChange, onDocChange, onClearImage, onClearDoc,
  error, saving, onSave, onCancel,
}: {
  form: Partial<Announcement>
  setForm: React.Dispatch<React.SetStateAction<Partial<Announcement>>>
  imagePreview: string | null
  docFile: File | null
  imageRef: React.RefObject<HTMLInputElement>
  docRef: React.RefObject<HTMLInputElement>
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDocChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearImage: () => void
  onClearDoc: () => void
  error: string
  saving: boolean
  onSave: () => void
  onCancel: () => void
}) {
  const set = (k: keyof Announcement) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <label className="block font-raleway font-semibold text-xs uppercase tracking-wider text-ctrs-dark/50 mb-2">Category</label>
        <div className="flex gap-2">
          {(['Announcement', 'Achievement', 'Event'] as AnnouncementCategory[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setForm((f) => ({ ...f, category: c }))}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all duration-150 ${
                form.category === c ? CAT_COLORS[c] + ' border-transparent' : 'bg-white text-ctrs-dark/50 border-gray-200 hover:border-ctrs-green/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="label-sm">Title *</label>
        <input
          value={form.title ?? ''}
          onChange={set('title')}
          placeholder="Announcement title"
          className="field"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="label-sm">Excerpt <span className="text-ctrs-dark/30 font-normal">(optional — auto-generated if blank)</span></label>
        <textarea
          value={form.excerpt ?? ''}
          onChange={set('excerpt')}
          rows={2}
          placeholder="Short summary shown on the homepage cards…"
          className="field resize-none"
        />
      </div>

      {/* Body */}
      <div>
        <label className="label-sm">Full Content *</label>
        <textarea
          value={form.body ?? ''}
          onChange={set('body')}
          rows={6}
          placeholder="Write the full announcement here. Use blank lines to separate paragraphs."
          className="field resize-y"
        />
      </div>

      {/* Image */}
      <div>
        <label className="label-sm">Cover Image <span className="text-ctrs-dark/30 font-normal">(optional)</span></label>
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-200 group h-36">
            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={onClearImage}
              className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => imageRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-ctrs-green/40 hover:bg-ctrs-cream/50 transition-all group"
          >
            <ImageIcon size={20} className="text-gray-300 group-hover:text-ctrs-green/40 transition-colors" />
            <span className="font-opensans text-xs text-gray-400">Click to upload image</span>
          </button>
        )}
        <input ref={imageRef} type="file" accept="image/*" onChange={onImageChange} className="hidden" />
      </div>

      {/* Document */}
      <div>
        <label className="label-sm">Attachment <span className="text-ctrs-dark/30 font-normal">(PDF, Word, image — optional)</span></label>
        {(docFile || form.document_url) ? (
          <div className="flex items-center gap-3 p-3 bg-ctrs-cream rounded-xl border border-ctrs-green/15">
            <FileText size={16} className="text-ctrs-green flex-shrink-0" />
            <span className="font-opensans text-sm text-ctrs-dark truncate flex-1">
              {docFile?.name ?? form.document_name ?? 'Existing document'}
            </span>
            <button type="button" onClick={onClearDoc} className="text-red-400 hover:text-red-500 flex-shrink-0">
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => docRef.current?.click()}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:border-ctrs-green/40 hover:bg-ctrs-cream/50 transition-all group"
          >
            <Paperclip size={16} className="text-gray-300 group-hover:text-ctrs-green/40" />
            <span className="font-opensans text-xs text-gray-400">Attach document</span>
          </button>
        )}
        <input ref={docRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*" onChange={onDocChange} className="hidden" />
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-6 pt-1">
        <div className="flex items-center gap-3">
          <ToggleSwitch
            value={form.is_published ?? false}
            onChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
            label=""
            onColor="bg-ctrs-green"
          />
          <div>
            <p className="font-semibold text-sm text-ctrs-dark">Published</p>
            <p className="font-opensans text-[11px] text-ctrs-dark/40">Visible on the website</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ToggleSwitch
            value={form.is_popup ?? false}
            onChange={(v) => setForm((f) => ({ ...f, is_popup: v }))}
            label=""
            onColor="bg-ctrs-amber"
          />
          <div>
            <p className="font-semibold text-sm text-ctrs-dark">Popup Alert</p>
            <p className="font-opensans text-[11px] text-ctrs-dark/40">Show modal on page load</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="font-opensans text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-ctrs-dark hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={onSave} disabled={saving} className="flex-1 py-3 bg-ctrs-green text-white rounded-lg text-sm font-semibold hover:bg-ctrs-green/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check size={15} />}
          {saving ? 'Saving…' : 'Save Announcement'}
        </button>
      </div>
    </div>
  )
}

// ─── Calendar Event Form ─────────────────────────────────────────
function EvForm({
  form, setForm, error, saving, onSave, onCancel,
}: {
  form: Partial<CalendarEvent>
  setForm: React.Dispatch<React.SetStateAction<Partial<CalendarEvent>>>
  error: string
  saving: boolean
  onSave: () => void
  onCancel: () => void
}) {
  const set = (k: keyof CalendarEvent) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="space-y-4">
      <div>
        <label className="label-sm">Title *</label>
        <input value={form.title ?? ''} onChange={set('title')} placeholder="Event title" className="field" />
      </div>
      <div>
        <label className="label-sm">Description <span className="text-ctrs-dark/30 font-normal">(optional)</span></label>
        <textarea value={form.description ?? ''} onChange={set('description')} rows={3} placeholder="Brief description…" className="field resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-sm">Start Date *</label>
          <input type="date" value={form.event_date ?? ''} onChange={set('event_date')} className="field" />
        </div>
        <div>
          <label className="label-sm">End Date <span className="text-ctrs-dark/30 font-normal">(optional)</span></label>
          <input type="date" value={form.event_end_date ?? ''} onChange={set('event_end_date')} className="field" />
        </div>
      </div>
      <div>
        <label className="label-sm">Type</label>
        <div className="flex gap-2">
          {(['Calendar', 'Event', 'Special'] as CalendarEventType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((f) => ({ ...f, event_type: t }))}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                form.event_type === t ? 'bg-ctrs-green text-white border-transparent' : 'bg-white text-ctrs-dark/50 border-gray-200 hover:border-ctrs-green/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="font-opensans text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-ctrs-dark hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={onSave} disabled={saving} className="flex-1 py-3 bg-ctrs-green text-white rounded-lg text-sm font-semibold hover:bg-ctrs-green/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check size={15} />}
          {saving ? 'Saving…' : 'Save Event'}
        </button>
      </div>
    </div>
  )
}

// ─── Shared UI ───────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-playfair text-xl font-bold text-ctrs-dark">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-ctrs-dark/40 hover:text-ctrs-dark transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

function ToggleSwitch({
  value, onChange, label, onColor,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
  onColor: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      {label && <span className="font-opensans text-[11px] text-ctrs-dark/50">{label}</span>}
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${value ? onColor : 'bg-gray-200'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center gap-3 text-center">
      {icon}
      <p className="font-opensans text-sm text-ctrs-dark/40">{message}</p>
    </div>
  )
}
