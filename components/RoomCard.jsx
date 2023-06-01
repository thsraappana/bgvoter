"use client"

import  { useState, useEffect } from 'react'
import Image from "next/image"

import { styled } from '@mui/material/styles'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))

function RoomCard({room}) {
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    }

    const numberOfCopies = 10;

    const copiedArray = Array.from({ length: numberOfCopies }, (_, index) => ({
    ...room.players[0],
    _id: room.players[0]._id + index + 1,
    }));

    room.players = copiedArray
    console.log(room)
    return(
        <div>
            <Card sx={{ minWidth: 275 }} className='mb-5'>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {room.publicName}
                </Typography>
                <Typography variant="h5" component="div">
                    {room.name}
                </Typography>
                <Typography variant="body2">
                    {room.desc}
                </Typography>
                </CardContent>
                <CardActions>
                    <span className="p-2">PLAYERS</span>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {room.players.map(player => (
                            <div key={player._id} className="flex mb-3">
                                <div className="flex items-center">
                                    <Image
                                        src={player.image}
                                        width={37}
                                        height={37}
                                        className="rounded-full"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex flex-col pl-3">
                                    <span className="font-bold">{player.username}</span>
                                    <span className="text-sm text-gray-700">{player.email}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Collapse>
            </Card>
      </div>
      );
}

export default RoomCard