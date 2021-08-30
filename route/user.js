const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.post('/registerUser', [check('username').isAlphanumeric().withMessage('Username length should contain alphabets and numbers')
.isLength({min: 8, max: 30}).withMessage('Username length should be greater than 8'),
check('password', 'Password length should be greater than 8').isLength({min: 8, max: 30})] ,
async (req,res) => {
    const user = await Users.find({username: req.body.username});
    if(user.length) return res.json({message: 'User Already Exist!!'});
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        res.json(errors)
    }
    else{
        const registerUser = new Users(req.body);
        const salt = await bcrypt.genSalt(10);
        registerUser.password = await bcrypt.hash(registerUser.password, salt);
        const data = await registerUser.save();
        res.json({isDetails: true, message: "User Registered Successfully!!"});
    }
})

router.post('/login', async (req, res) =>{
    const getUser = await Users.findOne({username: req.body.username});

    if(getUser){
        const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
        if(comparePassword) return res.json({isDetails: true, message: "Logged in Successfully!!"})
        else return res.json({message: "Invalid Details!!"})
    }
    else return res.json({message: "Invalid Details!!"})
})

module.exports = router;