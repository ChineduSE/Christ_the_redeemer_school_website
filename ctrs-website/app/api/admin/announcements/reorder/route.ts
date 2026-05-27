import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

function auth(req: NextRequest) {
  return req.cookies.get('admin_session')?.value === 'authenticated'
}

export async function PUT(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = createAdminClient()
  const { items } = await request.json() as { items: { id: string; display_order: number }[] }

  await Promise.all(
    items.map(({ id, display_order }) =>
      db.from('announcements').update({ display_order }).eq('id', id)
    )
  )

  return NextResponse.json({ success: true })
}
