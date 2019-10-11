const mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    questions:[{questionid:String}],
    totalTaken:{type:Number, default:0},
    averageScore:{type:Decimal128, default: 0.0},
    savedquestions:[{questionid:String, starred:Boolean}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('testModel', TestSchema);