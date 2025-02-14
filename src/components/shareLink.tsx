'use client'

import Link from "next/link"
import Button from "./ui/button"
import { useEffect, useState } from "react"

const TEXT = {
  COPY: 'Copiar',
  COPIED: '¡Copiado!'
}

interface ShareLinkProps {
  route: string
}

function ShareLink ({ route }: ShareLinkProps) {
  const [link, setLink] = useState('')
  const [buttonText, setButtonText] = useState(TEXT.COPY)

  useEffect(() => {
    const baseUrl = global.location.origin
    setLink(`${baseUrl}${route}`)
  }, [route])

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setButtonText(TEXT.COPIED)
    setTimeout(() => {
      setButtonText(TEXT.COPY)
    }, 1000)
  }

  return (
    <div className="flex flex-col w-fit">
      <p className="flex gap-2 items-center">Invitación
        <Link href={link} className="text-brand-midnight font-bold text-sm hover:underline">
          {link}
        </Link>
      </p>
      <Button className="h-6" onClick={handleCopy} disabled={buttonText === TEXT.COPIED}>
        {buttonText}
      </Button>
    </div>
  )
}

export default ShareLink
