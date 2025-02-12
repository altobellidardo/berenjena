'use client'

import { useState } from "react"
import Button from "./ui/button"
import Input from "./ui/input"
import { CircleX, Loader } from "lucide-react"

interface HomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  action: (formData: FormData) => Promise<{ error?: string }>
  inputName: string
  inputPlaceholder: string
  buttonText: string
}

function HomeCard ({
  children,
  title,
  description,
  action,
  inputName,
  inputPlaceholder,
  buttonText
}: HomeCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    console.log('antes')
    const result = await action(formData)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    }
  }

  return (
    <section className='flex-1 max-w-md p-6'>
      <h2 className='font-bold text-xl'>{title}</h2>
      <p className='mb-4'>{description}</p>
      <form onSubmit={handleCreateRoom} className='space-y-2'>
        <Input
          type="text"
          name={inputName}
          placeholder={inputPlaceholder}
        />
        {children}
        <Button
          type="submit"
          className='w-full'
          disabled={loading}
        >
          {loading
            ? <span className="flex items-center">
                <Loader className="mr-1 h-4 w-4 inline animate-spin" />
                Cargando...
              </span>
            : buttonText}
        </Button>
      </form>

      {error && <p className="text-red-500 text-sm flex items-center">
        <CircleX className="mr-1 h-4 w-4 inline" />
        {error}
      </p>}
    </section>
  )
}

export default HomeCard
