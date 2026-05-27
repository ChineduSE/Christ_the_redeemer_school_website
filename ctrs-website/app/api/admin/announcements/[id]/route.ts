import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

function auth(req: NextRequest) {
  return req.cookies.get('admin_session')?.value === 'authenticated'
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = createAdminClient()
  const body = await request.json()

  // Only one popup can be active at a time
  if (body.is_popup === true) {
    await db.from('announcements').update({ is_popup: false }).neq('id', params.id)
  }

  const { data, error } = await db
    .from('announcements')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = createAdminClient()
  const { error } = await db.from('announcements').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
