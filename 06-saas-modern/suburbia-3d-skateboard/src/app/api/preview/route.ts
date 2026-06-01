import type { NextRequest } from 'next/server'
import { createClient } from '@/prismicio'

import { redirectToPreviewURL } from '@prismicio/next'

export async function GET(request: NextRequest) {
  const client = createClient()

  return await redirectToPreviewURL({ client, request })
}
