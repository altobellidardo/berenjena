// import { DBAddScore } from "@/libs/supabase/tables/scores"
import Button from "./ui/button"
import Scoreboard from "./scoreboard";
import { CirclePlus, UserPen } from "lucide-react";
import ShareLink from "./shareLink";
import { players } from "@/types/game";
import GameActions from "./gameActions";

interface AdminPageProps {
  players: players
  adminId: string
  roomId: string
}

function AdminPage ({
  players,
  adminId,
  roomId
}: AdminPageProps) {
  // async function addScore (formData: FormData) {
  //   'use server'

  //   const score = formData.get('score')
  //   const scoreStr = Number.parseInt(score as string, 10)
  //   await DBAddScore(roomId, adminId, scoreStr)
  // }

  // const adminName = players.find((player) => player.id === adminId)?.name

  return (
    <main className="min-h-screen bg-brand-bone">
      <div className="container mx-auto p-4 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-center text-brand-midnight">Anotador Berenjena</h1>
          <h3 className="text-lg">Código de la sala: <strong className="text-brand-midnight">{roomId}</strong></h3>
          <ShareLink route={`/room?id=${roomId}`} />
        </header>

        <section>
          <h2 className="text-2xl mb-4">Acciones</h2>

          {/* <div className="flex gap-2">
            <Button>
              <UserPen className="mr-2" />
              Modificar jugadores
            </Button>
            <Button variant="secondary">
              <CirclePlus className="mr-2" />
              Nueva ronda
            </Button>
          </div> */}

          {/* <form action={addScore} className="flex">
            <input type="number" name="score" min={0} max={99} className="text-center" />
            <Button type="submit">Añadir puntuación</Button>
          </form> */}

          <GameActions players={players} />
        </section>

        <section>
          <Scoreboard players={players} />
        </section>

        {/* <section>
          <h2 className="text-2xl">Editar jugadores</h2>

          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {player.name}
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </li>
            ))}
          </ul>
        </section> */}
      </div>
    </main>
  )
}

export default AdminPage
