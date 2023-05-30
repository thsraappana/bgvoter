"use client"

import { useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

import CircularProgress from '@mui/material/CircularProgress'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

const NewRoom = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const [room, setRoom] = useState({
        name: '',
        publicName: '',
        desc: '',
        code: ''
    })
    const [showCode, setShowCode] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        {/* TODO:  add form verification here */}

        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('/api/rooms/new', {
                method: "POST",
                body: JSON.stringify({
                    name: room.name,
                    publicName: room.publicName,
                    desc: room.desc,
                    code: room.code,
                    userId: session?.user.id,
                })
            })

            if (response.ok) {
                {/* TODO: move to the newly created room page */}
                const jsonData = await response.json();
                console.log(response);
                router.push(`/rooms/${jsonData._id}`);
            }
        } catch (error) {
            {/* TODO: Handle Errors such as room already exists and 500 server errors with alert from MUI */}
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (status === "unauthenticated") {
        router.push('/')
    }

    if (status === "loading") {
        return <CircularProgress color="secondary" />
    }

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="purple_gradient">Create Room</span>
            </h1>
            <p className="desc-2 text-left max-w-md">
                Create game rooms, vote for the next game, and archive completed games for future reference.
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 mb-10 w-full max-2-2xl flex flex-col gap-7 bg-gray-300 p-4 rounded-md"
                >
                <label>
                    <span className="flex w-full items-center justify-between font-semibold text-base text-gray-700">
                        Name
                        <Tooltip title="Name seen by the members of the room">
                            <IconButton>
                                <InfoOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <input
                        value={room.name}
                        onChange={(e) => setRoom({...room, name: e.target.value})}
                        placeholder="name"
                        required
                        className="form_input"
                />
                </label>

                <label>
                    <span className="flex w-full items-center justify-between font-semibold text-base text-gray-700">
                        Public Name
                        <Tooltip title="Name used to join the room. Must not have spaces or special characters.">
                            <IconButton>
                                <InfoOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <input
                        value={room.publicName}
                        onChange={(e) => {
                            setRoom({...room, publicName: e.target.value.replace(/[^A-Z0-9]/ig, "")})}
                        }
                        placeholder="public name"
                        required
                        className="form_input"
                />
                </label>

                <label>
                    <span className="flex w-full items-center justify-between font-semibold text-base text-gray-700">
                        Room Code
                        <div>
                            <IconButton onClick={() => setShowCode((prev) => !prev)}>
                                <VisibilityOutlinedIcon />
                            </IconButton>
                            <Tooltip title="Code needed to join this room. Use only numbers and letters.">
                                <IconButton>
                                    <InfoOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </span>
                    <input
                        value={room.code}
                        onChange={(e) => {
                            setRoom({...room, code: e.target.value.toUpperCase().replace(/[^A-Z0-9]/ig, "")})}
                        }
                        placeholder="room code"
                        required
                        className="form_input"
                        type={showCode ? "text" : "password"}
                />
                </label>

                <label>
                    <span className="flex w-full items-center justify-between font-semibold text-base text-gray-700">
                        Description
                        <Tooltip title="Room description. Not required.">
                            <IconButton>
                                <InfoOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <textarea
                        value={room.desc}
                        onChange={(e) => {
                            setRoom({...room, desc: e.target.value})}
                        }
                        placeholder="description"
                        className="form_textarea"
                />
                </label>
                <div className="flex justify-end mx-3 mb-5 gap-4">
                    <Button variant="text" color="secondary">Cancel</Button>
                    {/* TODO:  disable button when creating */}
                    <Button type="submit" variant="outlined" color="secondary">{submitting ? `Creating...` : "Create"}</Button>
                </div>
            </form>
        </section>
    )
    }

export default NewRoom