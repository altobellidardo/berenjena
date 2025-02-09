import { Button } from "@/components/ui"
import Link from "next/link"

interface RoomIdPageProps {
  params: { id: string }
}

async function RoomIdPage ({ params }: RoomIdPageProps) {
  const { id: roomId } = await params

  return (
    <main>
      RoomIdPage: {roomId}

      <Link href="/"><Button className="p-2 bg-red-200 text-black">Home</Button></Link>
    </main>
  )
}

export default RoomIdPage
