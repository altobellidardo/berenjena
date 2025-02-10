'use server'

import { createClient } from "../server";

const supabase = createClient();

export async function DBAddScore (roomId: string, userId: string, score: number) {
  return supabase
    .from('scores')
    .insert({ room_id: roomId, player_id: userId, points: score, round: 1 })
}
