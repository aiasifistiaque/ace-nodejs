const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: {type: String,required: true,trim: true},
    lastname: {type: String,required: true,trim: true},
    phone: {type:String,trim:true},
    email: {required:true,type:String,unique:true,},
    password:{type:String,required:true},
    city:{type: String,trim: true,lowercase: true},
    age:{type: Number},
    location:{type: String},
    takentests:[{testid:String, date:Date, totalmarks:Number, obtainedmarks:Number}],
    questionhistoy:[{questionid:String, attempts:Number, scored:Number, skipped:Number, wrong:Number}],
    savedquestions:[{questionid:String, starred:Boolean}],
    score:{type:Number, default:0},        
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('user', UserSchema);