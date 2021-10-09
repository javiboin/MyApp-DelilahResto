const { Router } = require('express');
const router = Router();

const User = require('../models/user.model');

router.post('/signup', (req, res, next) => {
  const { nickname, complete_name, email, phone, address, password } = req.body;
  console.log(nickname, complete_name, email, phone, address, password);

  const createUser = async (req) => {
    const newUser = await User.build({
      nickname : nickname, 
      complete_name : complete_name, 
      email : email, 
      phone : phone, 
      address: address,
      password : password
    });
  
    const result = await newUser.save();
    return result;
  }

  createUser(req.body);
  
  res.json({ message: "received" });
});

router.post('/signin', (req, res, next) => {
  res.json('signin');
})

router.get('/me', (req, res, next) => {
  res.json('me');
})

module.exports = router;