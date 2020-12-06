import express from "express";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
// Authentication with JWT
// import { auth } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route       GET users
 * @description Get All Users
 * @access      public
 */
router.get("/", async (req, res) => {
	// else get all
	await User.find().then((users) => res.json(users));
});

/**
 * @route       GET
 * @description Get a user by their id
 * @access      public
 */
router.get("/:id", async (req, res) => {
	// else get all
	await User.findById(req.params.id).then((users) => res.json(users));
});

/**
 * TODO: Change this to make it find any user, not used for login anymore
 * @route       POST api/users
 * @description Register the user from the request into the database
 * @access      public
 */
router.post("/", async (req, res) => {});

/**
 * @route       DELETE api/users/:id
 * @description Delete a User by their ID and returns the user which was deleted
 * @access      public
 */
router.delete("/:id", async (req, res) => {
	User.findByIdAndRemove(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json({ success: false }));
});

/**
 * @route       UPDATE api/users/:id
 * @description Update a User completely by their ID and returns the user which was updated
 * @access      public
 */
router.put("/:id", async (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((user) => res.json({ user }))
		.catch((err) => res.status(404).json({ success: false }));
});

/**
 * @route       UPDATE api/users/:id
 * @description Update particular fields of a User by their ID and returns the updated user.
 * @access      public
 */
router.patch("/:id", async (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((user) => res.json({ user }))
		.catch((err) => res.status(404).json({ success: false }));
});

/**
 * @route       GET api/users/signin
 * @description Sign in using your email and password
 * @access      public
 */
router.post("/sign_in", async (req, res) => {
	const { email, password } = req.body;

	// Check that we got an email and password
	if (!email || !password) {
		return res
			.status(400)
			.json({ msg: "Please enter all fields of information." });
	}

	// Check for existing user:
	await User.findOne({ email }).then((user) => {
		// If the user does not exist.
		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({
					msg: "Invalid credentials",
				});
			}
			// Sign the token
			jwt.sign(
				{ id: user.id },
				config.get("jwtsecret"),
				// {expiresIn: time} add this if we want the token to
				(err, token) => {
					if (err) throw err;
					res.json({ token, user });
				}
			);
		});
	});
});

export default router;
