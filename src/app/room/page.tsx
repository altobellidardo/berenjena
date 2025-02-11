import { isAdmin } from "@/utils/isAdmin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface RoomPageProps {
  searchParams: Promise<{ id: string } | undefined>
}

async function RoomPage ({ searchParams }: RoomPageProps) {
  const id = (await searchParams)?.id
  if (!id) redirect('/')
  
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  const res = await isAdmin(token, id)
  if (!res) return <p>guest page</p>

  const { adminId } = res

  return (
    <main>RoomPage id {adminId}</main>
  )
}

export default RoomPage
