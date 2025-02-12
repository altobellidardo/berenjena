'use client'

import Link from "next/link"
import Button from "./ui/button"

interface ShareLinkProps {
  route: string
}

function ShareLink ({ route }: ShareLinkProps) {
  cont 
  return (
    <div className="flex gap-2">
      <p>Link de invitación</p>
      <Link href={`/room?id=${roomId}&name=${adminId}`} className="text-brand-midnight font-bold">{`/room?id=${roomId}&name=${adminId}`}</Link>
      <Button>Copiar</Button>
    </div>
  )
}

export default ShareLink
