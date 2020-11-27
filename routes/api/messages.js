import express from "express";
import Chat from "../../models/Chat.js";
import Message from '../../models/Message.js'
// We can use this middleware in order to restrict sending of messages to people who are logged in.
// To add this middleware we just have to add it as the SECOND PARAMETER in the requests.
// On the front end, to make this authentication work, we have to add the token to the header with key=x-auth-token, value = token
// import { auth } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route       POST api/messages/new_chat
 * @description creat a new chat
 * @access      public
 */
router.post("/new_chat", (req, res) => {
	const chat = req.body;

	Chat.create(chat, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});


/**
 * @route       POST api/messages/new_msg
 * @description send a message
 * @access      public
 */
router.put("/new_msg", (req, res) => {
	const message = req.body;

	Message.create(message, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

/**
 * @route       GET api/messages/:id
 * @description get messages with chatId :id
 * @access      public
 */
router.get("/:id", (req, res) => {
	Message.find({chatId: req.params.id}, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});


/**
 * @route       GET api/messages/chat/:id
 * @description get messages with chatId :id
 * @access      public
 */
router.get("/get_chat/:id", (req, res) => {
	Chat.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});



export default router;
