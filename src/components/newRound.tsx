function NewRound () {
  return (
    <div>
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

export default NewRound
