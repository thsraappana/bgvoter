"use client"

import  { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

function Rooms() {
    const { data: session, status } = useSession()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
      const fetchRooms = async () => {
        const response = await fetch('/api/rooms')
        const data = await response.json()

        console.log(data);
      }

      if (session?.user.id) fetchRooms()
    }, [session?.user.id])

    return (
      <div>Rooms</div>
    )
}

export default Rooms