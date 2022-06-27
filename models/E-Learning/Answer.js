const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Answer = new
    Schema(
        {
            optionNumber: Number,
            isValid : Boolean,
            user : { type: Schema.Types.ObjectId, ref: 'User' },
            question : { type: Schema.Types.ObjectId, ref: 'question' },
        }
    );
module.exports = mongoose.model('answer', Answer);
