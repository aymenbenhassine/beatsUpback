const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    EventName:{
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name must be less than 50 Characters']
    },

    EventDes:{
        type: String,
        required: true,
        trim: true,
    },
    
    EventDate:{
        type: String,
        required: true,
    },

    EventHost:{
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name must be less than 50 Characters']
    },

    Eventphoto:{
        type: String,
        required: true,
        trim: true,
       
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', Schema)