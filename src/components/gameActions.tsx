'use client'

import { Ban, CirclePlus, UserPen } from "lucide-react"
import Button from "./ui/button"
import { useState } from "react"
import { players } from "@/types/game"

enum GameState {
  CLOSE,
  EDIT,
  NEW_ROUND
}

interface GameActionsProps {
  players: players
}

function GameActions ({ players }: GameActionsProps) {
  const [state, setState] = useState<GameState>(GameState.CLOSE)

  const closeSection = () => setState(GameState.CLOSE)
  const editPlayers = () => setState(GameState.EDIT)
  const newRound = () => setState(GameState.NEW_ROUND)

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={editPlayers}
          disabled={state === GameState.EDIT}
        >
          <UserPen className="mr-2" />
          Editar jugadores
        </Button>

        <Button
          variant="secondary"
          onClick={newRound}
          disabled={state === GameState.NEW_ROUND}
        >
          <CirclePlus className="mr-2" />
          Nuevo turno
        </Button>

        {state !== GameState.CLOSE &&
          <Button
            onClick={closeSection}
            className="bg-red-500 text-brand-white hover:bg-red-600"
          >
            <Ban className="mr-2" />
            Cerrar
          </Button>
        }
      </div>



        {/* <Button onClick={
          state === GameState.EDIT ? closeSection : editPlayers
        } className={cn(state === GameState.EDIT && 'bg-red-500 text-brand-white')}>
          {state === GameState.EDIT ? 'Cerrar' : <>
          <UserPen className="mr-2" />
            'Editar jugadores'
          </>}
        </Button>
        <Button variant="secondary" onClick={
          state === GameState.NEW_ROUND ? closeSection : newRound
        }>
          <CirclePlus className="mr-2" />
          {state === GameState.NEW_ROUND ? 'Cerrar' : 'Nuevo turno'}
        </Button>
      </div> */}
      
      <p>game state {state}</p>
      {state === GameState.EDIT && <EditPlayers players={players} />}
      {state === GameState.NEW_ROUND && <NewRound players={players} />}
    </>
  )
}

export default GameActions

interface EditPlayersProps {
  players: players
}

function EditPlayers ({ players }: EditPlayersProps) {
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  )
}

interface NewRoundProps {
  players: players
}

function NewRound ({ players }: NewRoundProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Nuevo turno</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}
            <Button>Eliminar</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
