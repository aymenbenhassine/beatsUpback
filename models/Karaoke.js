const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    KaraokeName:{
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name must be less than 50 Characters']
    },

  

    KaraokeHost:{
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name must be less than 50 Characters']
    },
 
    Karaokephoto:{
        type: String,
        required: true,
        trim: true,
       
    },

    Karaokelyrics:{
        type: String,
        required: true,
        trim: true,
       
    },


    Karaokemp3:{
        type: String,
        required: true,
        trim: true,
       
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Karaoke', Schema)