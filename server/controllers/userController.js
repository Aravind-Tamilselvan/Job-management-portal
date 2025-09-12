import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists please login" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Enter a valid email address" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        if (newUser) {
            await generateToken(newUser._id, res)
            await newUser.save()
            newUser.password = null
            res.status(200).json({ message: "User created Successfully", newUser }) // status code 200 denotes successfull 
        } else {
            res.status(400).json({ message: 'Invalid User data' }) //status code 400 denotes bad request
        }
    } catch (error) {
        console.error(`Error in register controller: ${error}`);
        res.status(500).json({ message: "Internal Server Error" }); //status code 500 denotes internal server
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        const isPasswordCorrect = await bcrypt.compare(password, user?.password)

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email and password" })
        }

        await generateToken(user._id, res)
        user.password = null
        res.status(200).json({ message: `User Login Successfully`, user })
    } catch (error) {
        console.log(`Error in login controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: "User Logout Successfully" })
    } catch (error) {
        console.log(`Error in logout controller: ${error}`)
        res.status(500).json({ error: "Internal Server error" })
    }
}