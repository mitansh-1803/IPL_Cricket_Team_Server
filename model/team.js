const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    team: String,
    fullName: String,
    logo: String
},{strict: false});

const Teams = mongoose.model('ipl-teams', schema);

module.exports = Teams;