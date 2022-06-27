const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Question = new
    Schema(
        {
            question: String,
            option1: String,
            option2: String,
            option3: String,
            option4: String,
            correctAnswer: Number,
            quiz : { type: Schema.Types.ObjectId, ref: 'quiz' },
        }
    );
module.exports = mongoose.model('question', Question);