import { connectToDB } from "@utils/database";
import Room from "@models/room";

export const GET = async () => {
    try {
        await connectToDB();

        const rooms = await Room.find({}, { code: 0 }).populate('players').populate('creator')
        console.log(rooms)

        return new Response(JSON.stringify(rooms), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch rooms", { status: 500 })
    }
}