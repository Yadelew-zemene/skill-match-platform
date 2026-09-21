import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const toPublicUser = ({ id, name, email, role }) => ({
  id,
  name,
  email,
  role,
});

export const createAuthController = ({
  userModel = User,
  bcryptLib = bcrypt,
  tokenGenerator = generateToken,
} = {}) => {
  const register = async (req, res) => {
    try {
                const { name, email, password, role } = req.body;
                const existingUser = await userModel.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ message: "Email already exists" });
                }

                const hashedPassword = await bcryptLib.hash(password, 10);
                await userModel.create({
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
  };

  const login = async (req, res) => {
    try {
       
            const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Email and password required" });
            }

            const user = await userModel.findByEmail(email);
                
            if (!user) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            const isMatch = await bcryptLib.compare(password, user.password);
            // console.log("PASSWORD MATCH:", isMatch)
            if (!isMatch) {
                    return    res.status(401).json({ message: "Invalid credentials" });
                }
            const token = tokenGenerator({ id: user.id,role: user.role,});
                res.json({ token, user: toPublicUser(user) });
    } catch (error) {
        // console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "login faild" });
    }
  };

  return { register, login };
};

const authController = createAuthController();

export const { register, login } = authController;

