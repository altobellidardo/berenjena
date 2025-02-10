import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

export type Payload = RealtimePostgresChangesPayload<Score>

export interface Score {
  created_at: string
  id: string
  player_id: string
  points: number
  room_id: string
  round: number
}
