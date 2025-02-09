import { cookies } from "next/headers"
import AdminPage from "./adminPage"
import GuestPage from "./guestPage"
import { isAdmin } from "@/utils/isAdmin"

interface RoomIdPageProps {
  params: { id: string }
}

async function RoomIdPage ({ params }: RoomIdPageProps) {
  const { id: roomId } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  const res = await isAdmin(token, roomId)
  if (!res) return <GuestPage />
  return <AdminPage roomId={roomId} adminId={res.adminId} />
}

export default RoomIdPage
