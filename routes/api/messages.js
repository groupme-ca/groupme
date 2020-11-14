<<<<<<< HEAD
import express from "express";
import Messages from "../../models/Messages.js";
// We can use this middleware in order to restrict sending of messages to people who are logged in.
// To add this middleware we just have to add it as the SECOND PARAMETER in the requests.
// On the front end, to make this authentication work, we have to add the token to the header with key=x-auth-token, value = token
// import { auth } from "../../middleware/auth.js";
=======
import express from 'express';
import chats from '../../models/Messages.js';
>>>>>>> 182b7a6 (changed the messages model to a chat model)

const router = express.Router();

/**
 * @route       POST api/messages/new
 * @description send messages
 * @access      public
 */
<<<<<<< HEAD
router.post("/new", (req, res) => {
	const Message = req.body;

	Messages.create(Message, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
=======
router.post('/new', (req, res) => {
    const Chat = req.body;

    chats.create(Chat, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
>>>>>>> 182b7a6 (changed the messages model to a chat model)
});

/**
 * @route       GET api/messages/sync
 * @description send messages
 * @access      public
 */
<<<<<<< HEAD
router.get("/sync", (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});
=======
router.get('/:id', (req, res) => {
    chats.find(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})




>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)

export default router;
