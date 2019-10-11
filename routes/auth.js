const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) => {
    //validate before we make an user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error);

    //check if user is already in the database
    const emailExists = await userModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    // const phoneExists = await userModel.findOne({phone: req.body.phone});
    // if (phoneExists) return res.status(400).send('Phone number already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        //phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        city: req.body.city,
        age: req.body.age
    });

    try{
        const saveUser = await user.save();
        res.send(saveUser);
    }catch{
        res.status(400).send(error);
    }
});

router.post('/login', async (req,res) => {
    //validate before we login
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user exists in the database
    const user = await userModel.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User does not exist');

    //if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');
    
    //create and assingn jwt token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    console.log(user);
    return res.json({user: user, token: token});

    //res.send('login successfull');

});

router.get('/allusers',async function(req,res){
    console.log('step one')
    try{
      const users = await userModel.find();
      return res.json(users);
    }catch(err){
      return res.json(err);
    }
  });

  router.get('/user/:id',async function(req,res){
    console.log('step one')
    try{
      const users = await userModel.find({_id: req.params.id });
      return res.json(users);
    }catch(err){
      return res.json(err);
    }
  });

module.exports = router;