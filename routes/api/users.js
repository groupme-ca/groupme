import express from 'express';
import User from '../../models/User.js'

const router = express.Router();
// User Model
// const User = require('../../models/User').default;

/** 
 * @route       GET users
 * @description Get all users
 * @access      public
*/
router.get('/', (req, res) => {
	User.find()
		.then(users => res.json(users));
})


/** 
 * @route       POST api/users
 * @description Post all users
 * @access      public
*/
router.post('/', (req, res) => {
	const newUser = new User({
		name: req.body.name, 
		username: req.body, 
		email: req.body.email,
		hobbies: req.body.hobbies, 
		courses: req.body.courses
	});

	newUser.save().then(user => res.json(user))
})


/** 
 * @route       DELETE api/users/:id
 * @description Delete a Users
 * @access      public
*/
router.get('/', (req, res) => {
	User.delete(req.params.id)
		.then(user => user.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}))
});

export default router;
// module.exports = router;