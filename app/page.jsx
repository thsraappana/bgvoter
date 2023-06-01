"use client"

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

import RoomCreateJoin from '@components/RoomCreateJoin'

function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleCreateRoomClick = () => {
    if (session?.user.id) {
      router.push("/rooms/create")
    } else {
      alert("You need to be logged in to create new rooms!")
    }
  }

  return (
    <section className="w-full flex-center">
        <h1 className="head_text text-center">
            BGVoter
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center max-md:hidden">Streamline your game nights!</span>
        </h1>
        <p className="desc text-center">
          Create custom game rooms, vote for the next game, and archive completed games for future reference. The ultimate platform for collaborative gaming decisions.
        </p>
        <RoomCreateJoin handleCreateRoomClick={handleCreateRoomClick} handleJoinRoomClick={() => {}} />
    </section>
  )
}

export default Home