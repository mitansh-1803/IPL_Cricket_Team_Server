const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    id: Number,
    playerName: String,
    from:String,
    price: String,
    isPlaying: Boolean,
    description: String    
},{strict: false});

const Players = mongoose.model('ipl-players',schema);

module.exports = Players;