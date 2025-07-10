import express from "express";
import User from "../users/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltValue = 10;

router.post("/Register", async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        const joinedDate = Date.now();
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, saltValue);
        // const verificationCode = (Math.floor(Math.random() * 9000) + 1000).toString();
        const newUser = new User({
            email,
            password: hashedPassword,
            joined: joinedDate,
            
            isVerified: true
        });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/Login", async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid credentials"});
        }
        res.status(200).json({message: "Login successful"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
})

router.post("/Profile", async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/updateProfile", async (req, res) => {
    try {
        const { email, phone, address, avatar } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.phone = phone;
        user.address = address;
        if (avatar) user.avatar = avatar;
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile" });
    }
});


export default router;
