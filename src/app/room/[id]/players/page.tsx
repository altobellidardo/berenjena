import { DbGetPlayers } from "@/libs/supabase/tables/players"
import { DBGetScores } from "@/libs/supabase/tables/scores"
import { isAdmin } from "@/utils/isAdmin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Form from "./form"
import List from "./list"

interface PlayersProps {
  params: { id: string }
}

async function Players ({ params }: PlayersProps) {
  const { id: roomId } = await params

  // ver si es admin
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const res = await isAdmin(token, roomId)
  if (!res) return redirect(`/room/${roomId}`)

  const { data: initialPlayers, error: playersError } = await DbGetPlayers(roomId)
  if (playersError) console.error(playersError)
  const { data: scores, error: scoresError } = await DBGetScores(roomId)
  console.log(scores)
  if (scoresError) console.error(scoresError)
  
  // match scores with players
  const list = initialPlayers?.map((player) => {
    const playerScores = scores?.filter((score) => score.player_id === player.id)
    return { ...player, scores: playerScores?.map((score) => score.points) }
  })

  const data = {
    players: list,
    adminId: res.adminId
  }

  return (
    <main>
      <h1>Players {roomId}</h1>

      <List data={data} roomId={roomId} />
    </main>
  )
}

export default Players
