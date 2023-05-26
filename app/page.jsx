"use client"

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button';

function Home() {
  const router = useRouter();

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
        <div className="flex justify-evenly mt-5 sm:mt-20 max-md:flex-col max-md:items-center">
          <div>
            <Button onClick={() => router.push("/rooms/new")} style={{ paddingRight: 50, paddingLeft: 50, paddingTop: 25, paddingBottom: 25, width: 300, borderWidth: 3 }} variant="outlined" color="secondary">Create Room</Button>
          </div>
          <div className="max-md:mt-5">
            <Button style={{ paddingRight: 50, paddingLeft: 50, paddingTop: 25, paddingBottom: 25, width: 300, borderWidth: 3 }} variant="outlined" color="secondary">Join Room</Button>
          </div>
        </div>
    </section>
  )
}

export default Home