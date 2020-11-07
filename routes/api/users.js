import express from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

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
 * @route       POST api/users
 * @description Post the user from the request into the database
 * @access      public
 */
router.post("/", async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter all fields of information." });
    }

    // Check for existing user:
    User.findOne({ email }).then((user) => {
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
                newUser.save().then((user) => res.json(user));
            });
        });
    });
});

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
 * @description Update a User by their ID and returns the user which was updated
 * @access      public
 */
router.put("/:id", async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(404).json({ success: false }));
});

//TODO: cookies or a way to identify user
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
            res.json(user);
        });
    });
});

export default router;
