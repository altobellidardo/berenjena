
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
    <main>GuestPage</main>
  )
}

export default GuestPage
