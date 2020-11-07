import express from 'express';
import User from '../../models/User.js';

const router = express.Router();

/** 
 * @route       GET users
 * @description Get All Users
 * @access      public
*/
router.get('/', async (req, res) => {

	// else get all
	await User.find()
		.then(users => res.json(users));
});

/** 
 * @route       POST api/users
 * @description Post the user from the request into the database
 * @access      public
*/
router.post('/', async (req, res) => {
	// Save the new user from the request
	const newUser = new User(req.body);

	newUser.save().then(user => res.json(user))
});


/** 
 * @route       DELETE api/users/:id
 * @description Delete a User by their ID and returns the user which was deleted
 * @access      public
*/
router.delete('/:id', async (req, res) => {
	User.findByIdAndRemove(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(404).json({success: false}))
});

router.put('/:id', async (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new:true})
						.then(user => res.json(user))
						.catch(err => res.status(404).json({success: false}))
	
});
//TODO: cookies or a way to identify user
/** 
 * @route       GET api/users/signin
 * @description Sign in using your email and password
 * @access      public
*/
router.post('/sign_in', async (req, res) => {
	User.find(req.body, function (err, usr) {
		//if the user doesnt exist
		// console.log(usr);
		if (!Array.isArray(usr) || !usr.length) {
			console.log('User not found.');
		} 		
		// console.log(usr);	
	}).then(user => res.json(user))
	.catch(err => res.status(404).json({success: false}));
});

// router.get('/sign_in', async (req, res) => {
// 	const user = User.find(req.body)
// 					.catch(err => res.status(404).json({success: false}));
// 		//if the user doesnt exist
// 	if (!user) {
// 		console.log('User not found.');
// 	}
// 	else{
// 		user.then(usr => res.json(usr));
// 	}		
// });

export default router;