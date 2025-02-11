'use server'

import { createClient } from "../server";

const supabase = createClient();

export async function DBAddScore (roomId: string, userId: string, score: number) {
  return supabase
    .from('scores')
    .insert({ room_id: roomId, player_id: userId, points: score, round: 1 })
}

export async function DBGetScores (roomId: string) {
  return supabase
    .from('scores')
    .select('id, player_id, points, round')
    .eq('room_id', roomId)
}
