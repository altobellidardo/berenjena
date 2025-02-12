import AdminPage from "@/components/adminPage"
import GuestPage from "@/components/guestPage"
import { DbGetPlayer } from "@/libs/supabase/tables/players"
import { isAdmin } from "@/utils/isAdmin"
import { getMatchData } from "@/utils/matchData"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface RoomPageProps {
  searchParams: Promise<{ id: string, name: string } | undefined>
}

async function RoomPage ({ searchParams }: RoomPageProps) {
  const sParams = await searchParams
  const id = sParams?.id
  if (!id) redirect('/')

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const res = await isAdmin(token, id)

  if (!res) {
    const name = sParams?.name
    if (!name) redirect('/')

    const { data: newPlayer, error: playerError } = await DbGetPlayer(id, name)
    if (playerError) redirect('/')

    return <GuestPage player={newPlayer} />
  }

  const { adminId } = res

  const players = await getMatchData(id)

  return <AdminPage players={players} adminId={adminId} roomId={id} />
}

export default RoomPage
