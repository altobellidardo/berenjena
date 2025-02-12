'use server'

import { DbCreatePlayer, DbGetPlayers } from "@/libs/supabase/tables/players"
import { redirect } from "next/navigation"

async function joinRoom (formData: FormData) {
  const roomId = (formData.get('roomCode') as string)?.trim()
  if (!roomId) return { error: 'El código de la sala es obligatorio' }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const { data: players, error: playersError } = await DbGetPlayers(roomId)
  if (playersError) console.error(playersError)

  if (players?.find((player) => player.name === name)) {
    return { error: 'El nombre ya está en uso' }
  }

  const { error: createPlayerError } = await DbCreatePlayer(name, roomId)
  if (createPlayerError) console.error(createPlayerError)

  return redirect(`/room?id=${roomId}&name=${name}`)
}

export default joinRoom
