import RealTime from "@/components/realTime"
import { Button } from "@/components/ui"
import { DBAddScore } from "@/libs/supabase/tables/scores"
import Link from "next/link"

interface AdminPageProps {
  roomId: string
  adminId: string
}

function AdminPage ({ roomId, adminId }: AdminPageProps) {
  async function addScore (formData: FormData) {
    'use server'
  
    const newScore = formData.get('newScore')
    console.log('newScore', newScore)
  
    const { data, error } = await DBAddScore(
      roomId,
      adminId,
      newScore ? Number(newScore) : 10
    )
    console.log('adminPage addScore', { data, error })
  }

  return (
    <main>
      <h1>Admin page</h1>

      <p>RoomIdPage: {roomId}</p>
      <p>adminId: {adminId}</p>

      <Link href="/">
        <Button className="p-2 bg-red-200 text-black">Home</Button>
      </Link>

      <form action={addScore}>
        <input type="number" name="newScore" className="p-2 bg-red-200 text-black" />
        <button type="submit">Add score</button>
      </form>

      <Link href="/room/[id]/players" as={`/room/${roomId}/players`}>
        Editar jugadores
      </Link>

      <RealTime />
    </main>
  )
}

export default AdminPage
