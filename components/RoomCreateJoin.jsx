import React from 'react'

import Button from '@mui/material/Button'

function RoomCreateJoin({ handleCreateRoomClick, handleJoinRoomClick }) {
  return (
    <div className="flex justify-evenly mt-5 sm:mt-20 max-md:flex-col max-md:items-center">
    <div>
      <Button
        onClick={handleCreateRoomClick}
        style={{ paddingRight: 50, paddingLeft: 50, paddingTop: 25, paddingBottom: 25, width: 300, borderWidth: 3 }}
        variant="outlined" color="secondary">
          Create Room
      </Button>
    </div>
    <div className="max-md:mt-5">
      <Button style={{ paddingRight: 50, paddingLeft: 50, paddingTop: 25, paddingBottom: 25, width: 300, borderWidth: 3 }} variant="outlined" color="secondary">Join Room</Button>
    </div>
  </div>
  )
}

export default RoomCreateJoin