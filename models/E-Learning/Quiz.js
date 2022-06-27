const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var Quiz = new
  Schema(
    {
      title: String,
      description: String,
      module: {
        type: Schema.Types.ObjectId, ref: 'module',
         unique: true
      },
      question: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "question"
        }
      ],
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  );
 Quiz.plugin(uniqueValidator);
module.exports = mongoose.model('quiz', Quiz);