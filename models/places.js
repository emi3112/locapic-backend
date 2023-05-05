const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: String,
    longitude: String,
});

const PLace = mongoose.model('places', placeSchema);

module.exports = PLace;