
import express from "express";
import chats from "../../models/Messages.js";
// We can use this middleware in order to restrict sending of messages to people who are logged in.
// To add this middleware we just have to add it as the SECOND PARAMETER in the requests.
// On the front end, to make this authentication work, we have to add the token to the header with key=x-auth-token, value = token
// import { auth } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route       POST api/messages/new
 * @description send messages
 * @access      public
 */
router.post("/new", (req, res) => {
	const chat = req.body;

	chats.create(chat, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

/**
 * @route       GET api/messages/:id
 * @description send messages
 * @access      public
 */
router.get("/:id", (req, res) => {
	chats.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});


/**
 * @route       PUT api/messages/:id
 * @description Update message content of chat with :id
 * @access      public
 */
router.put("/:id", async (req, res) => {
	chats.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((chat) => res.json(chat))
		.catch((err) => res.status(404).json({ success: false }));
});

export default router;
