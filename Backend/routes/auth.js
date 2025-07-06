const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
// JWT Secret for signing tokens
const JWT_SECRET = 'ZaidIsAGoodBoy';
//Route 1: create a user using: POST "/api/auth/createuser"Dosent require authentication. 
router.post('/createuser',
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    // check whether the user this with this email exists already
    let user =await User.findOne({email: req.body.email});
    console.log(user);
    if (user) {
    return res.status(400).json({  error: "Sorry a user with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
   const authtoken = jwt.sign  (data, JWT_SECRET);
   
    res.json({authtoken});
    
}  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//Route 2:Authenticate a user using: POST "/api/auth/login" No login requiredrouter.post('/createuser',
router.post('/login',
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),  
  ],async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // check whether the user exists with this email
      let user = await User.findOne({ email });
console.log("User found:", user); // Add this line

if (!user) {
  return res.status(400).json({ error: "Please try to login with correct credentials" });
}

const passwordCompare = await bcrypt.compare(password, user.password);
console.log("Password compare result:", passwordCompare); // Add this line
if (!passwordCompare) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
      const data= {
        user: {
          id: user.id,
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
   }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");

    }
  
  })
//Route 2:Get Login User Details usin: POST "/api/auth/getuser" Login required
router.post('/getuser',fetchuser,async (req, res) => {

try {
  userId = req.user.id;
  const user = await User.findById(req.user.id).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");

}
  });

module.exports = router;                         