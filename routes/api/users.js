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







export default router;
// module.exports = router;