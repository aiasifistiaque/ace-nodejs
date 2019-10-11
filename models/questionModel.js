const mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    question: {type: String,required: true,trim: true},
    optionone: {type: String,required: true,trim: true},
    optiontwo: {type: String,required: true,trim: true},
    optionthree: {type: String,required: true,trim: true},
    optionfour: {type: String,required: true,trim: true},
    answer: {type: String,required: true,trim: true},
    testid: {type:String},
    course: {type:String, required:true},
    chapter: {type: String},
    medium: {type: String},
    examType: {type: String},
    year: {type: String},
    board: {type: String},
    school: {type: String},
    division: {type: String},
    difficulty: {type: Number, default:0},
    attempts: {type: Number, default:0},
    correct: {type:Number, default:0},
    reports: [{_id: String, description: String, date: Date}],        
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('questionModel', QuestionSchema);