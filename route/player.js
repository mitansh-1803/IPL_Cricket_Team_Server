const express = require('express');
const router = express.Router();
const Players = require('../model/player');
const { check, validationResult } = require('express-validator');

router.post('/addPlayer', [
    check('userData.code','Your code must be correct!!').isAlphanumeric().equals("345235"),
    check('playerData.id','id must be Number').isDecimal(),
    check('playerData.playerName','Name must contains alphabets').isString(),
    check('playerData.from','Team must be MI, CSK, PK, RR, RCB, KKR, DD, SRH').isAlpha().isUppercase().isIn(["MI", "CSK", "PK", "RR", "RCB", "KKR", "DD", "SRH"]),
    check('playerData.price','Price must contains alphabets and numbers').isString(),
    check('playerData.photo','Photo should contains a URL').isURL(),
    check('playerData.isPlaying','Status must be a boolean value').isBoolean(),
    check('playerData.description').isIn(['BatsMan','Bowler','All-rounder','Wicket Keeper']).withMessage('Description must be a valid Input')
] ,
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json(errors)
    }
    else{
        const player =  new Players(req.body.playerData);
        const data = await player.save();
        res.json({message: "Player Added Successfully!!"})
    }
})

router.get('/getPlayers', async (req,res) => {
    const players = await Players.find();
    res.json(players);
})

router.get('/getPlayer/:id', async (req,res) => {
    const id = req.params.id;
    const player = await Players.findOne({id: id});
    res.json(player);
})

module.exports = router;