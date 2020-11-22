// This is the server file
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

// Import users from router
import users from "./routes/api/users.js";
import messages from "./routes/api/messages.js";
import auth from "./routes/api/auth.js";

// Setup database config
import config from "config";

const path = require('path');
const app = express();
app.disable("x-powered-by");
// Body parser
app.use(express.json());

//allow request to come from any endpoint with any header
//IF WE EVER DO SECURITY THIS MUST BE REMOVED
app.use(cors());

// Use Routes
app.use("/api/users", users); // anything that goes to 'api/users' should refer to users
app.use("/api/messages", messages); // anything that goes to 'api/messages' should refer to messages
app.use("/api/auth", auth); // anything that goes to 'api/auth' should refer to auth

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//pusher setup
const pusher = new Pusher({
	appId: "1102380",
	key: "d386d4bf8093a108cca2",
	secret: "965e04a59ac481a6ce60",
	cluster: "us2",
	useTLS: true,
});

// Connect to MongoDB
mongoose
	.connect(config.get("mongoURI"), {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

const db = mongoose.connection;

//listening to the db the messages collection
db.once("open", () => {
	console.log("db connected");

	const msgCollection = db.collection("messages");
	const changeStream = msgCollection.watch();

	changeStream.on("change", (change) => {
		console.log(change);

		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages-channel", "inserted", {
				name: messageDetails.name,
				message: messageDetails.message,
			});
		} else {
			console.log("error triggering pusher");
		}
	});
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
