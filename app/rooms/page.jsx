"use client"

import { useRouter } from 'next/navigation'
import  { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

import RoomCreateJoin from '@components/RoomCreateJoin'
import RoomCard from '@components/RoomCard'

import CircularProgress from '@mui/material/CircularProgress'

function Rooms() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [rooms, setRooms] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchRooms = async () => {
        const response = await fetch('/api/rooms')
        const data = await response.json()
        console.log(data)


        setRooms(data)
        setLoading(false)
      }

      if (session?.user.id) fetchRooms()
      if (status === "unauthenticated") setRooms([])
    }, [status])

    const noRoomsFound = () => {
      return (
        <div>
          {session?.user.id ? (
            <>
            <p className="desc-2 text-center">No rooms found. Start by creating or joining one!</p>
            <RoomCreateJoin handleCreateRoomClick={() => router.push("/rooms/create")} handleJoinRoomClick={() => {}} />
            </>
          ) : (
          <p className="desc-2 text-center">
            Not logged in. Log in first!
          </p>
          )}
        </div>
      );
    }

    return(
      <section className="w-full">
          <h1 className="text-5xl font-extrabold text-gray-700 text-center mb-10">
              My Rooms
          </h1>
        {status === "loading" && (<div className="flex justify-center"><CircularProgress color="secondary" /></div>)}
        {status !== "loading" && rooms && rooms.length === 0 && noRoomsFound()}
        {status !== "loading" && !loading && rooms && rooms.length > 0 && (
          <div className="flex flex-wrap place-content-evenly">
             {rooms.map(room => <RoomCard key={room._id} room={room} />)}
           </div>
        )}
      </section>
    )

}

export default Rooms