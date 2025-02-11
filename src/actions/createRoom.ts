'use server'

import { signToken } from "@/libs/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import createRoomAndPlayer from "./createRoomAndPlayer"

async function createRoom (formData: FormData) {
  const name = (formData.get('adminName') as string)?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const { error, room, adminId } = await createRoomAndPlayer(name)
  if (error) return { error }

  const cookieStore = await cookies()

  const token = signToken({ id: adminId, name }, '1h')
  cookieStore.set('session', token, { httpOnly: true, secure: true, path: '/' })

  return redirect(`/room?id=${room?.id}`)
}

export default createRoom
