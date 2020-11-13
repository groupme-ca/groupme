import jwt from "jsonwebtoken";
import config from "config";

export function auth(req, res, next) {
	const token = req.header("x-auth-token");
	// Check for token
	if (!token) {
		return res.status(401).json({
			msg: "No token, authorization denied.",
		});
	}
	try {
		// Verify token
		const decoded = jwt.verify(token, config.get("jwtsecret"));
		// Add user from the payload
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: "Token is not valid." });
	}
}
