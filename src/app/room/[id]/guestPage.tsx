import { Button } from "@/components/ui"
import Link from "next/link"

function GuestPage () {
  return (
    <main>
      <h1>Guest page</h1>

      <Link href="/">
        <Button className="p-2 bg-red-200 text-black">Home</Button>
      </Link>

      <form action="">
        <input type="name" name="name" />
        <button type="submit">Ingresar</button>
      </form>
    </main>
  )
}

export default GuestPage
