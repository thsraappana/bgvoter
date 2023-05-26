"use client"

import React from 'react'

const NewRoom = () => {

  const handleSubmit = () => {
    console.log("handle submit")
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
            className="mt-10 w-full max-2-2xl flex flex-col gap-7 glassmorphism"
            >
        {/* TODO: create room form here */}
        </form>
    </section>
  )
}

export default NewRoom