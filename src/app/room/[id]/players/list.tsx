'use client'

import { useState } from "react"
import Form from "./form"

interface ListProps {
  data: object
  roomId: string
}

function List ({ data, roomId }: ListProps) {
  const [players, setPlayers] = useState(data.players)
  const adminId = data.adminId

  console.log('players', players)

  function addPlayerState (newPlayer) {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer])
  }

  return (
    <>
      {players.map((player, index) => <div key={index}>{player.name} score: {player.scores}</div>)}
      <Form roomId={roomId}  />
    </>
  )
}

export default List
