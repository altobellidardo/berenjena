import { DbAddPlayer } from '@/libs/supabase/tables/players'
import { DbCreateRoom } from '@/libs/supabase/tables/rooms'
import type { createRoomAndPlayerResponse } from '@/types/createRoom'
import { generateHash } from '@/utils/hash'

async function createRoomAndPlayer (adminName: string): Promise<createRoomAndPlayerResponse> {
  // Crear id de nuevo usuario
  const adminId = generateHash()

  try {
    // Crear la sala
    const { data: roomData, error: roomError } = await DbCreateRoom(adminId)
    if (roomError) throw new Error('Error creating room')

    // Crear el jugador dentro de la sala
    const { error: playerError } = await DbAddPlayer(roomData.id, adminId, adminName)
    if (playerError) throw new Error('Error creating player')

    return { room: roomData, adminId }
  } catch (error) {
    console.error('Error en createRoomAndPlayer:', error)
    return { error: 'Error creating room and player' }
  }
}

export default createRoomAndPlayer
