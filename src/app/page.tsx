import { CreateRoom } from '@/components/createRoom'

export default function Home ()  {
  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-6'>Anotador Berenjena</h1>
          <p className='text-muted-foreground mb-8'>
            Crea una sala, invita a jugadores y mantén el marcador en tiempo real
          </p>
          <CreateRoom />
        </div>
      </div>
    </div>
  )
}
