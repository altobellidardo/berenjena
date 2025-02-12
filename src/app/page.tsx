import createRoom from '@/actions/createRoom'
import joinRoom from '@/actions/joinRoom'
import HomeCard from '@/components/homeCard'
import Input from '@/components/ui/input'

export default function Home ()  {
  return (
    <div className='min-h-screen bg-brand-bone'>
      <div className='container mx-auto px-4 pt-10 md:pt-32 pb-16'>
        <h1 className='text-4xl font-bold mb-10 text-center'>Anotador Berenjena</h1>

        <main className='flex flex-col md:flex-row w-fit md:w-full mx-auto justify-center gap-10'>
          <HomeCard
            title='Crear sala'
            description='invita a jugadores y mantén el marcador en tiempo real'
            action={createRoom}
            inputName='adminName'
            inputPlaceholder='Ingresa tu nombre'
            buttonText='Comenzar'
          />

          <div className='hidden md:block bg-brand-blue w-[2px] rounded-xl' />

          <HomeCard
            title='Unirse a sala'
            description='pide el código de la sala a tus amigos'
            action={joinRoom}
            inputName='roomCode'
            inputPlaceholder='ab12cd3e'
            buttonText='Unirse'
          >
            <Input type='text' name='name' placeholder='Jugador 1' />
          </HomeCard>
        </main>
      </div>
    </div>
  )
}
