const DB = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const transport = require("../utils/mailer")
require("dotenv").config()

const signupController = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const existingUser = await DB.USER.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await DB.USER.create({
      name,
      email,
      password: hashedPassword,
      role: "USER"
    })

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome",
      text: `Hello ${name}, welcome to LUME`
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Something went wrong"
    })

  }
}

const signinController = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const user = await DB.USER.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Password incorrect"
      })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Signin successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Something went wrong"
    })

  }

}

const forgetPassword = async (req, res) => {

  try {

    const { email } = req.body

    const user = await DB.USER.findOne({ email })

    if (!user) {
      return res.json({
        message: "User not found"
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)

    user.otp = otp
    user.otpExpire = Date.now() + 5 * 60 * 1000

    await user.save()

    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`
    })

    res.json({
      message: "OTP sent to email"
    })

  } catch (error) {

    res.status(500).json({
      message: "Something went wrong"
    })

  }

}


const verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body

    const user = await DB.USER.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (user.otp != otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      })
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      })
    }

    res.json({
      message: "OTP verified"
    })

  } catch (error) {

    res.status(500).json({
      message: "Something went wrong"
    })

  }

}


const resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body

    const user = await DB.USER.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.otp = null
    user.otpExpire = null

    await user.save()

    res.json({
      message: "Password reset successful"
    })

  } catch (error) {

    res.status(500).json({
      message: "Something went wrong"
    })

  }

}

module.exports = {
  signupController,
  signinController,
  forgetPassword,
  verifyOtp,
  resetPassword
}