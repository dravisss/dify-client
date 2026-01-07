import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')

  if (!conversationId) {
    return NextResponse.json({ data: [], has_more: false, limit: 20 }, {
      headers: setSession(sessionId),
    })
  }

  try {
    const { data }: any = await client.getConversationMessages(user, conversationId)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.response?.status || 500 },
    )
  }
}
