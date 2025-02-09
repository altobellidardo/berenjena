import { createClient } from '../server'

const supabase = createClient()

export async function DbAddPlayer (roomId: string, userId: string, userName: string) {
  return await supabase
    .from('players')
    .insert({ room_id: roomId, id: userId, name: userName })
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
