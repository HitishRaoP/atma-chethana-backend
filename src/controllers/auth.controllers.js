import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import "dotenv/config";
import { setUserTokenAndCookie } from "../middlewares/jwt-auth.js";

const signup = async (req, res) => {
	const { fullName, email, password } = req.body;

	if (!fullName) {
		return res.json({ sucess: false, message: "Name Is Required" });
	}
	if (!email) {
		return res.json({ sucess: false, message: "E-mail Is Required" });
	}
	if (!password) {
		return res.json({ sucess: false, message: "Password Is Required" });
	}

	if (password.length < 8) {
		return res.json({
			success: false,
			message: "Password Must be minimum of 8 character long",
		});
	}

	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, message: `User Already Exists` });
		}
		const saltRound = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, saltRound);

		const user = await User.create({
			fullName,
			email,
			password: hashedPassword,
		});

		setUserTokenAndCookie(user, res);

		return res.json({ success: true, message: `User Registered SuccessFully` });
	} catch (error) {
		console.log(`The Error is ${error}`);
		res.json({ success: false, message: error.message });
	}

	res.json({ success: true, message: `User Created SUccessfully` });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email) {
		return res.json({
			successs: false,
			message: `E-Mail is Required for Login`,
		});
	}
	if (!password) {
		return res.json({
			success: false,
			message: `Password Is Mandatory For Login`,
		});
	}

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				messasge: `User With The Provided E-Mail Doeson't exist`,
			});
		}

		const isPassWordMatch = await bcrypt.compare(password, user.password);
		if (!isPassWordMatch) {
			return res.json({ success: false, message: `Invalid Password` });
		}

		setUserTokenAndCookie(user, res);

		return res.json({ success: true, message: `User Logged In SuccessFully` });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

const logout = async (req, res) => {
	try {
		res.clearCookie("jwtToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV == "production",
			sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
		});

		return res.json({ success: true, message: `User Logged Out SuccessFully` });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

const checkAuthorisation = async (req, res) => {
	try {
		return res.json({ success: true, message: "User Is Authorized" });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};

export { signup, login, logout, checkAuthorisation };
