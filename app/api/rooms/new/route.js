import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth/next"
import Room from "@models/room";

import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
}

export const POST = async (req, res) => {
    const session = await getServerSession(req, {
        ...res,
        getHeader: (name) => res.headers?.get(name),
        setHeader: (name, value) => res.headers?.set(name, value),
      }, authOptions)

    const { userId, name, publicName, desc, code } = await req.json();

    try {
        if (!session) {
            return new Response("Unauthorized request", { status: 401 })
        }

        await connectToDB();

        const roomExists = await Room.findOne({ publicName: publicName })

        if(!roomExists) {
            const newRoom = new Room({ 
                creator: userId,
                name,
                publicName,
                desc,
                code,
                players: [userId]
            })
    
            await newRoom.save();
    
            return new Response(JSON.stringify(newRoom), {
                status: 201
            });
        } else {
            return new Response("Room already exists", { status: 400 })
        }

    } catch (error) {
        return new Response("Failed to create a new room", {
            status: 500
        })
    }
}