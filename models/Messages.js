import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const MessageSchema = new Schema({
    message: String,
    name: String,
    timestamp: String,
    ChatId: String
});

export default model('messages', MessageSchema);