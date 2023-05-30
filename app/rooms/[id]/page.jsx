"use client"

import  { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from 'next/navigation'

const Room = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { data: session, status } = useSession()

    const [room, setRoom] = useState({})

    useEffect(() => {
      const fetchRoom = async () => {
        const response = await fetch(`/api/rooms/${pathname.split("/").pop()}`)
        const data = await response.json()

        if (data?.players.includes(session?.user.id)) {
          setRoom(data)
        } else {
          alert("Not a member of this room!")
          router.push('/')
        }
      }

      if (session?.user.id) fetchRoom()
    }, [session?.user.id])

    if (status === "unauthenticated") {
      router.push('/')
    }

    return (
      <div>{room.name}</div>
    )
}

export default Room