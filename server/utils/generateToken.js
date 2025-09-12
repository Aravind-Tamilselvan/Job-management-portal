import jwt from 'jsonwebtoken'


const generateToken = async(userId, res) => {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true, //xss attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateToken