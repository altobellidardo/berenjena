import { Button } from "@/components/ui"
import Link from "next/link"

interface AdminPageProps {
  roomId: string
  adminId: string
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
    </main>
  )
}

export default AdminPage
