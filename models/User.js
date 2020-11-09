import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
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
>>>>>>> 182b7a6 (changed the messages model to a chat model)
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
	}
});

export default model("User", UserSchema);
