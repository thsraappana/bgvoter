import { Schema, model, models } from 'mongoose';

const RoomSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    publicName: {
        type: String,
        required: [true, 'Public name is required'],
    },
    code: {
        type: String,
        required: [true, 'Room code is required'],
    },
    desc: {
        type: String,
    },
    players: {
        type: [String],
    },
    banned: {
        type: [String],
    },
});

const Room = models.Room || model('Room', RoomSchema);

export default Room;