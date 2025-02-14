import Input from "./ui/input"
import HomeCard from "./homeCard"
import joinRoom from "@/actions/joinRoom"

interface NoNameProps {
  roomId: string
}


function NoName ({ roomId }: NoNameProps) {
  return (
    <main className="flex flex-col justify-center items-center pt-12">
      <header>
        <h1 className="text-2xl font-bold">Anotador Berenjena</h1>
        <p className="text-xl mb-4 w-fit text-center">
          Sala: <strong className="text-brand-midnight">{roomId}</strong>
        </p>
      </header>
      <HomeCard
        title='Unirse a sala'
        description='pide el código de la sala a tus amigos'
        action={joinRoom}
        inputName='name'
        inputPlaceholder='Jugador 1'
        buttonText='Unirse'
      >
        <Input type='hidden' name="roomCode" value={roomId} />
      </HomeCard>
    </main>
  )
}

export default NoName
