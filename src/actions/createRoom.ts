'use server'

import { signToken, verifyToken } from '@/libs/jwt'
import createRoomAndPlayer from './createRoomAndPlayer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DbClearRoom, DbUpdatePlayer } from '@/libs/supabase/tables/players'
import { DbGetRoomByAdminId } from '@/libs/supabase/tables/rooms'

async function handleCreateRoom (formData: FormData) {
  // Verificar input
  const adminName = (formData.get('adminName') as string)?.trim()
  if (!adminName) return { error: 'El nombre del administrador es obligatorio' }

  // Leer token
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  // Verificar token
  if (!token) {
    // crear sala
    const { error, room, adminId } = await createRoomAndPlayer(adminName)
    if (error) return { error }

    // crear y guardar token
    const token = signToken({ id: adminId, name: adminName }, '1h')
    cookieStore.set('session', token, { httpOnly: true, secure: true, path: '/' })

    return redirect(`/room/${room?.id}`)
  }

  let roomIdTemp = ''
  let existingRoom = null

  try {
    // Decodificar token
    const tokenData = verifyToken(token) as { id: string, name: string }

    // Actualizar token
    const newToken = signToken({ id: tokenData.id, name: tokenData.name }, '1h')
    cookieStore.set('session', newToken, { httpOnly: true, secure: true, path: '/' })

    // Verificar si el admin ya tiene una sala
    const { data } = await DbGetRoomByAdminId(tokenData.id)
    existingRoom = data

    if (!existingRoom) {
      // Limpiar sala
      const { error } = await DbClearRoom(tokenData.id)
      if (error) return { error }

      roomIdTemp = tokenData.id
    }

    // Actualizar nombre de admin
    if (adminName !== tokenData.name) {
      const { error } = await DbUpdatePlayer(tokenData.id, adminName)
      if (error) return { error }
    }
  } catch (error) {
    console.error('Error leyendo token', error)

    // crear sala
    const { error: errorCreating, room, adminId } = await createRoomAndPlayer(adminName)
    if (errorCreating) return { error: errorCreating }

    // crear y guardar token
    const token = signToken({ id: adminId, name: adminName }, '1h')
    cookieStore.set('session', token, { httpOnly: true, secure: true, path: '/' })

    return redirect(`/room/${room?.id}`)
  }

  if (existingRoom) return redirect(`/room/${existingRoom.id}`)
  return redirect(`/room/${roomIdTemp}`)
}

export default handleCreateRoom
