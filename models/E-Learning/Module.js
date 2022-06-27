const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Module = new
    Schema(
        {
            title: String,
            description: String,
            creationDate: { type: Date, default: Date.now },
            content: String,
            videoURL: String,
            course : { type: Schema.Types.ObjectId, ref: 'courses' },
            ressources :[
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "ressources"
                }
              ],
            quiz :{
                type: mongoose.Schema.Types.ObjectId,
                ref: "quiz"
              }
        }
    );
module.exports = mongoose.model('module', Module);