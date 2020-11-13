import express from "express";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
// Authentication with JWT
import { auth } from "../../middleware/auth.js";

const router = express.Router();

/**
 * @route       POST api/users/register
 * @description Register the user from the request into the database
 * @access      public
 */
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ msg: "Please enter all fields of information." });
	}

	// Check for existing user:
	await User.findOne({ email }).then((user) => {
		// If the user already exists, send a message back.
		if (user) {
			return res.status(400).json({ msg: "User already exists." });
		}
		// Construct the new user
		const newUser = new User(req.body);
		// Create salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				// Save the new user from the request
				newUser.save().then((user) => {
					// Sign the token with the unique user id
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
	});
});

//TODO: cookies or a way to identify user
/**
 * @route       POST api/auth/login
 * @description Sign in a user using their email and password
 * @access      public
 */
router.post("/login", async (req, res) => {
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
					res.status(200).json({ token, user });
				}
			);
		});
	});
});

// Validate the user
/**
 * @route       GET api/auth/user
 * @description Get user data
 * @access      private
 */
router.get("/user", auth, async (req, res) => {
	await User.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user));
});

export default router;
