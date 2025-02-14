
interface GuestPageProps {
  player: {
    id: string
    room_id: string
    name: string
  }
}

function GuestPage ({ player }: GuestPageProps) {
  console.log('player', player)
  return (
    <main>
      GuestPage
      <p>{JSON.stringify(player, null, 2)}</p>
    </main>
  )
}

export default GuestPage
