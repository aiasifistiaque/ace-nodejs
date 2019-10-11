var express = require('express');
var router = express.Router();
var questionModel = require('../models/questionModel');
var verify = require('./verifytoken');
var userModel = require('../models/userModel')

router.post('/', async function(req,res){
    const question = new questionModel({
        question: req.body.question,
        optionone: req.body.optionone,
        optiontwo: req.body.optiontwo,
        optionthree: req.body.optionthree,
        optionfour: req.body.optionfour,
        answer: req.body.answer,
        course: req.body.course,
        board: req.body.board,
        year: req.body.year,
        medium: req.body.medium
    });

    try{
        const saveQuestion = await question.save();
        res.send(saveQuestion);
    }catch{
        res.status(400).send(error);
    }

});

router.get('/',async function(req,res){
  try{
    const questions = await questionModel.find();
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
});

router.get('/saved/:id',async function(req,res){
  try{
    const questions = await questionModel.findOne({_id: req.params.id});
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
});

router.get('/practice/:course',async function(req,res){
  try{
    const questions = await questionModel.aggregate([{ $match:{ course: req.params.course}}, { $sample: { size: 1 } }] );
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
  
});

router.get('/:board/:year',async function(req,res){
  try{
    const questions = await questionModel.find({ board: req.params.board, year: req.params.year }).distinct('course');
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
  
});

router.get('/:course',async function(req,res){
  try{
    const questions = await questionModel.find({ course: req.params.course }).distinct('course');
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
  
});


router.get('/:board/:year/:course',async function(req,res){
  try{
    const questions = await questionModel.find({ board: req.params.board, year: req.params.year, course: req.params.course  });
    return res.json(questions);
  }catch(err){
    return res.json({message: err});
  }
  
});

router.patch('/save', async(req, res) => {
  var question = {'questionid':req.body.questionid};
  await userModel.update({_id: req.body.id},
      {$push :{savedquestions:question}})
      .then(doc => {
      res.json(doc)
        }).catch(err => {
  res.status(500).json(err)
  })
});


router.post('/viewsaved',async function(req,res){
  try{
    const user = await userModel.findOne({ _id: req.body.id });
    return res.json(user);
  }catch(err){
    return res.json({message: err});
  }
  
});



// router.get('/:email',async function(req,res){
//   try{
//     const users = await UserModel.findOne({email: req.params.email});
//     return res.json(users);
//   }catch(err){
//     return res.json({message: err});
//   }
// });

// router.delete('/:email', async(req, res) => {

//   UserModel.remove({email: req.params.email})
//     .then(doc => {
//       res.json(doc)
//     }).catch(err => {
//       res.status(500).json(err)
//     })
// });

// router.patch('/:id', async(req, res) => {

//   await UserModel.updateOne({_id: req.params.id},
//       {$set :{name: req.body.name}})
//       .then(doc => {
//       res.json(doc)
//         }).catch(err => {
//   res.status(500).json(err)
//   })
// });

module.exports = router;
