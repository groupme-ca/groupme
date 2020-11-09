import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 182b7a6 (changed the messages model to a chat model)
const ChatSchema = new Schema({
    //participants format: [{
    //    userid: string,
    //    name: String
    //    }]
    participants: {
		type: Array,
		default: []
    },
    //if name is '' the used participants to get a name
    name: {
        type: String,
        required: true
    },
    //TODO: DEVAL NEEDS TO CHANGE THIS 
    //message format: [{
    //    sender: string,
    //    content: string,
    //    timestamp: string
    //}]
    messages: {
		type: Array,
		default: []
	},
<<<<<<< HEAD
=======
const MessageSchema = new Schema({
    message: String,
    UserId: String,
    timestamp: String,
    ChatId: String
>>>>>>> 0a997d2 (changed name in the message model to userid)
=======
>>>>>>> 182b7a6 (changed the messages model to a chat model)
});

export default model('chats', ChatSchema);