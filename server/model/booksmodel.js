const mongoose = require('mongoose');

var booksSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

const Booksdb = mongoose.model('booksdb', booksSchema);

module.exports = Booksdb;