const express = require('express');
const router = express.Router();
const Teams = require('../model/team');

router.get('/', async (req,res) => {
    var team = await Teams.find();
    if(team.length){
        res.json(team)
    }
    else{
        res.send('No Data Available')
    }
})

module.exports = router;