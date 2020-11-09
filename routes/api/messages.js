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
router.get('/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})





export default router;