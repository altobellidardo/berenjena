'use client'

import handleCreateRoom from '@/actions/createRoom'

import { Button, Input, Label, Card } from '@/components/ui'

// import { Users } from 'lucide-react';

export function CreateRoom () {
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // const result = await handleCreateRoom(formData)
    const result = await handleCreateRoom(formData)
    console.log(result)
  }

  return (
    <Card className='p-6'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='adminName'>Admin Name</Label>
          <Input
            id='adminName'
            name='adminName'
            placeholder='Ingresa tu nombre'
            required
          />
        </div>

        <Button type='submit' className='w-full'>
          {/* <Users className="mr-2 h-4 w-4" /> */}
          Create Room
        </Button>
      </form>
    </Card>
  )
}
