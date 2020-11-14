import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
<<<<<<< HEAD
		required: true,
=======
		required: true
<<<<<<< HEAD
>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)
=======
>>>>>>> 139767c6cccd249eb72f6f9ba63d93198f3f2825
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
<<<<<<< HEAD
		type: String,
		requred: true,
=======
		type: String, 
		required: true
<<<<<<< HEAD
>>>>>>> 182b7a6 (changed the messages model to a chat model)
=======
>>>>>>> 139767c6cccd249eb72f6f9ba63d93198f3f2825
	},
	bio: {
		type: String,
		default: "",
	},
	hobbies: {
		type: Array,
		default: [],
	},
	courses: {
		type: Array,
		default: [],
	},
	friends: {
		type: Array,
		default: [],
	},
	ChatIds: {
		type: Array,
		default: []
	},
	ChatIds: {
		type: Array,
		default: []
	},
	ChatIds: {
		type: Array,
		default: []
	}
});

export default model("User", UserSchema);
