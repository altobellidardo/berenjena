'use server'

import { createClient } from '../server'

const supabase = createClient()

export async function DbAddPlayer (roomId: string, userId: string, userName: string) {
  return await supabase
    .from('players')
    .insert({ room_id: roomId, id: userId, name: userName })
    .select('*')
    .single()
}

export async function DbClearRoom (roomId: string) {
  return await supabase
    .from('players')
    .delete()
    .eq('room_id', roomId)
}

export async function DbUpdatePlayer (userId: string, userName: string) {
  return await supabase
    .from('players')
    .update({ name: userName })
    .eq('id', userId)
}

export async function DbGetPlayers (roomId: string) {
  return await supabase
    .from('players')
    .select('name, id')
    .eq('room_id', roomId)
}

export async function DbCreatePlayer (name: string, roomId: string) {
  return await supabase
    .from('players')
    .insert({ room_id: roomId, name })
    .select('*')
    .single()
}

export async function DbGetPlayer (roomId: string, name: string) {
  return await supabase
    .from('players')
    .select('*')
    .eq('room_id', roomId)
    .eq('name', name)
    .single()
}