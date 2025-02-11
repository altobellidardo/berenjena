'use server'

import { redirect } from "next/navigation"

async function joinRoom (formData: FormData) {
  const roomId = (formData.get('roomCode') as string)?.trim()
  if (!roomId) return { error: 'El código de la sala es obligatorio' }

  return redirect(`/room?id=${roomId}`)
}

export default joinRoom
