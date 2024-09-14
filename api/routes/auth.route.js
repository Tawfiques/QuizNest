import express from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const route = express.Router();

route.post("/signup", async (req, res, next) => {
    const { firstName, lastName, email, password, RePassword } = req.body;
    if (!firstName || !lastName || !email || !password) return next(errorHandler(400, "Please fill in all fields"))
    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') return next(errorHandler(400, "All fields must be strings"))
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) return next(errorHandler(400, "Invalid email address"))
    if (password !== RePassword) return next(errorHandler(400, "Passwords do not match"))
    const hashPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({ name: `${firstName} ${lastName}`, email: email.toLowerCase() , password: hashPassword });
    try {
        await newUser.save();
        return res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
})
route.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(errorHandler(400, "Please fill in all fields"))
    if (typeof email !== 'string' || typeof password !== 'string') return next(errorHandler(400, "All fields must be strings"))
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) return next(errorHandler(400, "Invalid email address"))
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(403, "User not found"))
        }
        const isMatch = await bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return next(errorHandler(401, "Wrong credentials"));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: p, ...others } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json({ others });
    }
    catch (error) {
        next(error);
    }
})

route.get("/signout", (req, res) => {
    res.clearCookie("access_token").status(200).json({ message: "User signed out" })
});

export default route