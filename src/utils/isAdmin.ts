import { verifyToken } from "@/libs/jwt"
import { DbGetAdmin } from "@/libs/supabase/tables/rooms"
import type { userToken } from "@/types/game"

export async function isAdmin (token: string | undefined, roomId: string) {
  // si no hay token no es admin
  if (!token) return false

  let tokenData
  try {
    tokenData = verifyToken(token) as userToken
  } catch (error) {
    console.error(error)
    return false
  }

  // Obtener admin
  const { data, error } = await DbGetAdmin(roomId)
  if (error) console.error(error)
  const adminId = data?.admin_id

  if (tokenData?.id !== adminId) return false

  return { adminId }
}