import AdminPage from "@/components/adminPage";
import GuestPage from "@/components/guestPage";
import NoName from "@/components/noName";
import { DbCreatePlayer, DbGetPlayer } from "@/libs/supabase/tables/players";
import { isAdmin } from "@/utils/isAdmin";
import { getMatchData } from "@/utils/matchData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ id?: string; name?: string } | undefined>
}

async function Page ({ searchParams }: PageProps) {
  const sParams = await searchParams
  const roomId = sParams?.id
  if (!roomId) redirect('/')

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const adminData = await isAdmin(token, roomId)

  // Es admin
  if (adminData) {
    const { adminId } = adminData
    const players = await getMatchData(roomId)

    // refrescar token
    // const adminName = players.find((player) => player.id === adminId)?.name
    // const newToken = signToken({ id: adminId, name: adminName }, '1h')
    // cookieStore.set('session', newToken, { httpOnly: true, secure: true, path: '/' })

    return <AdminPage players={players} adminId={adminId} roomId={roomId} />
  }

  // No es admin
  const name = sParams?.name?.trim()
  if (!name) return <NoName roomId={roomId} />

  // el jugador existe?
  const { data: playerExists } = await DbGetPlayer(roomId, name)
  if (playerExists) return <GuestPage player={playerExists} />

  // el jugador no existe
  const { data: newPlayer } = await DbCreatePlayer(name, roomId)

  return <GuestPage player={newPlayer} />
}

export default Page
