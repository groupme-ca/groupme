import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

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

});

export default model('chats', ChatSchema);