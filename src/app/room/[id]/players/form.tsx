'use client'

import { DbAddPlayer } from "@/libs/supabase/tables/players"

interface FormProps {
  roomId: string
}

function Form ({ roomId }: FormProps) {
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPlayer = (formData.get('newPlayer') as string)?.trim()
    if (!newPlayer) return

    const userId = crypto.randomUUID()
    const res = await DbAddPlayer(roomId, userId, newPlayer)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="newPlayer" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
