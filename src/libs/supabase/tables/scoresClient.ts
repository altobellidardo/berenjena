import { createClient } from "../client"
import type { Payload } from "@/types/realtimeScores"

const supabase = createClient()

export function DBsubscribeScores (
  channel: string,
  handleInserts: (payload: Payload) => void
) {
  return supabase
    .channel(channel)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'scores' },
      handleInserts
    )
    .subscribe()
}
