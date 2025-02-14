'use server'

import { DbGetPlayer } from "@/libs/supabase/tables/players"
import { redirect } from "next/navigation"

async function joinRoom (formData: FormData) {
  const roomId = (formData.get('roomCode') as string)?.trim()
  if (!roomId) return { error: 'El código de la sala es obligatorio' }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const { data: playerExists } = await DbGetPlayer(roomId, name)
  if (playerExists) return { error: 'El nombre ya está en uso' }

  return redirect(`/room?id=${roomId}&name=${name}`)
}

export default joinRoom
