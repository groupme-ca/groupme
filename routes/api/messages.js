// We can use this middleware in order to restrict sending of messages to people who are logged in.
// To add this middleware we just have to add it as the SECOND PARAMETER in the requests.
// On the front end, to make this authentication work, we have to add the token to the header with key=x-auth-token, value = token
// import { auth } from "../../middleware/auth.js";
import express from 'express';
import chats from '../../models/Messages.js';


const router = express.Router();

/**
 * @route       POST api/messages/new
 * @description send messages
 * @access      public
 */
router.post('/new', (req, res) => {
    const Chat = req.body;

    chats.create(Chat, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

/**
 * @route       GET api/messages/sync
 * @description send messages
 * @access      public
 */
router.get('/:id', (req, res) => {
    chats.find(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})





export default router;
