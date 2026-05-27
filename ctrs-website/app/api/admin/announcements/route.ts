import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

const MAX = 7

function auth(req: NextRequest) {
  return req.cookies.get('admin_session')?.value === 'authenticated'
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = createAdminClient()
  const { data, error } = await db
    .from('announcements')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = createAdminClient()

  const { count } = await db
    .from('announcements')
    .select('*', { count: 'exact', head: true })

  if ((count ?? 0) >= MAX) {
    return NextResponse.json({ error: `Maximum of ${MAX} announcements reached` }, { status: 400 })
  }

  const body = await request.json()
  const slug = slugify(body.title || 'post') + '-' + Date.now()

  const { data, error } = await db
    .from('announcements')
    .insert({ ...body, slug, display_order: count ?? 0 })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
