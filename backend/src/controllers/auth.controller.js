import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({ message: "User Registered successfully" });



    }
    catch (error) {
        res.status(500).json({ message: "Registration Faild" });

    }
}
export const login = async (req, res) => {
    try {
        console.log("BODY:", req.body); 
        const { email, password } = req.body;
        if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

        const user = await User.findByEmail(email);
        // console.log("USER FOUND:", user); 
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
         console.log("PASSWORD MATCH:", isMatch)
        if (!isMatch) {
            return    res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken({
            id: user.id,
            role: user.role,
            
        });
        res.json({ token });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "login faild" });
    }
}