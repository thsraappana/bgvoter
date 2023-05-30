import { connectToDB } from "@utils/database";
import Room from "@models/room";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const room = await Room.findById(params.id, { code: 0 }).populate('creator')

        if(!room) return new Response("Room not found", { status: 404 })

        return new Response(JSON.stringify(room), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch room", { status: 500 })
    }
}
