import RealTime from "@/components/realTime"
import { Button } from "@/components/ui"
import { DBAddScore } from "@/libs/supabase/tables/scoresServer"
import Link from "next/link"

interface AdminPageProps {
  roomId: string
  adminId: string
}

async function addScore (formData: FormData) {
  'use server'

  const newScore = formData.get('newScore')
  console.log('newScore', newScore)

  const { data, error } = await DBAddScore(
    '838fa41f-11e8-4de9-a99a-e956c141534b',
    '54e0c96b-2b1a-43ee-9fde-e5ed9bba787e',
    newScore ? Number(newScore) : 10
  )
  console.log(data, error)
}

function AdminPage ({ roomId, adminId }: AdminPageProps) {
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
      <RealTime />
    </main>
  )
}

export default AdminPage
