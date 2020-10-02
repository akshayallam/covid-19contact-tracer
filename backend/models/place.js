const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true},
    date: { type: String, required: true},
    description: { type: String, required: true},
    people: { type: String, required: true},
    location: { type: String, required: true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Place', placeSchema);