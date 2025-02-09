import { Button } from "@/components/ui"
import Link from "next/link"

function AdminPage ({ roomId }: { roomId: string }) {
  return (
    <main>
      RoomIdPage: {roomId}

      <Link href="/"><Button className="p-2 bg-red-200 text-black">Home</Button></Link>
    </main>
  )
}

export default AdminPage
