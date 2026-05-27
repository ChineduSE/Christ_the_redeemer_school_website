export type AnnouncementCategory = 'Announcement' | 'Achievement' | 'Event'
export type CalendarEventType = 'Calendar' | 'Event' | 'Special'

export interface Announcement {
  id: string
  title: string
  excerpt: string | null
  body: string
  category: AnnouncementCategory
  image_url: string | null
  document_url: string | null
  document_name: string | null
  slug: string
  is_published: boolean
  is_popup: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface CalendarEvent {
  id: string
  title: string
  description: string | null
  event_date: string
  event_end_date: string | null
  event_type: CalendarEventType
  created_at: string
}
