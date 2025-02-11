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

export interface Player {
  id: string
  room_id: string
  name: string
  created_at: string
}
