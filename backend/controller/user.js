// CONTROLLER USER.JS

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Sign Up
const userSignUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    // Check if user already exists
    let user = await User.getByEmail(email);
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
  
    // Hash password and create new user
    const hashPwd = await bcrypt.hash(password, 10);
    const newUserId = await User.create(email, hashPwd);
  
    // Generate JWT token
    const token = jwt.sign({ 
      email, 
      id: newUserId, 
      admin: false // Default to false for new users
    }, process.env.SECRET_KEY);
  
    return res.status(200).json({ 
      token, 
      user: {
        id: newUserId,
        email,
        admin: false // Default to false for new users
      }
    });
};

// User Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    // Fetch user by email
    let user = await User.getByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ 
        email, 
        id: user.id, 
        admin: user.admin // Include admin status
      }, process.env.SECRET_KEY);
  
      return res.status(200).json({ 
        token, 
        user: {
          id: user.id,
          email: user.email,
          admin: user.admin // Include admin status
        }
      });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
};

// Get User by ID
const getUser = async (req, res) => {
    const user = await User.getById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ email: user.email });
};

module.exports = { userLogin, userSignUp, getUser };