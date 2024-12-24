import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_TOKEN, { expiresIn: maxAge })
}

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required")
        }
        const user = await User.create({ email, password })

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required")
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send("email not found")
        }
        const valid = await compare(password, user.password)
        if (!valid) {
            return res.status(400).send("Invalid Credentials")
        }
        else {
            res.cookie("jwt", createToken(email, user.id), {
                maxAge,
                secure: true,
                sameSite: "None"
            })
            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    profileSetup: user.profileSetup,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    color: user.color,
                }
            })
        }


    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId)   
        return res.status(200).json(
            {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}