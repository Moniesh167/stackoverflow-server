import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from 'firebase-admin/database'
import users from "../models/user.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const fuid = (await getAuth().createUser({ email, password })).uid;
    const db = getDatabase()
    const user = db.ref(`/users/${fuid}`)
    const callRef=db.ref(`/calls/${fuid}`)
    user.set({ name, email,uid:fuid }).catch(err => console.log(err));
    callRef.set({status:'idle'}).catch(err => console.log(err));
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      fuid:fuid,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
   
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng...");
  }
};

