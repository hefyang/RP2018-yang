const express = require('express');
const router = express.Router();

// Load User model
const Question = require('../../models/Qs');

//  @route  GET api/users/test
//  @desc   Test users route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "users works"}));


// Not use
// store exam name and create exam schema in database
router.post('/store', (req, res) =>
{
    Question.findOne({examName: req.body.examName})
        .then(exam => {
            if(exam){
                return res.status(400).json('exist exam name');
            }
            else
            {
                const newExam = {
                    examName: req.body.examName,
                    examType: req.body.examType,
                    totalNumber: req.body.totalNumber
                };

               new Question(newExam).save()
                    .then(exam => res.json(exam));
            }
        })
});


// Not use
// find the exam by exam name and add question for it
router.post('/store/question', (req, res) => {

    Question.findOne({examName: req.body.examName})
        .then(exam => {
            const newQuestion = ({
                questionId: req.body.questionId,
                questionTitle: req.body.questionTitle,
                questionType: req.body.questionType,
                rightAnswer: req.body.rightAnswer
            });

            exam.totalQuestion.unshift(newQuestion);
            exam.save().then(exam => res.json(exam));
        })
});


// Not use
router.post('/store/question/option', (req, res) =>{

    Question.findOne({examName: req.body.examName})
        .then(questions => {

           questions.totalQuestion.map(question =>{
               if(question.questionId === req.body.questionId)
               {

                   const newOption = {
                   option: req.body.option,
                   questionDescription: req.body.questionDescription
                   };
                   question.options.unshift(newOption);
                   questions.save().then(item => res.json(item));
               }
           })

        })

});


//  @route  GET api/exam
//  @desc   GET all exam
//  @access Public

router.get('/', (req, res) =>{

    Question.find({},'examName examType totalNumber').then(exam => res.json(exam));
});


//  @route  GET api/exam/:examName
//  @desc   GET needed exam
//  @access Public

router.get('/:examName', (req, res) =>
{
    Question.findOne({examName: req.params.examName})
        .then(exam => res.json(exam))
        .catch(err => res.status(404).json({examNoFound: 'Exam not found'}))
});


//  @route  GET api/exam/:examName/:id
//  @desc   GET needed question of selected exam
//  @access Public
// method 2
//
// router.get('/:examName/:id', (req, res) =>
// {
//     Question.findOne({examName: req.params.examName})
//         .then(exam => {
//             exam.totalQuestion.map(question =>{
//                 if(question.questionId === req.params.id)
//                 {
//                     res.json(question);
//                 }
//             })
//         })
//         .catch(err => res.status(404).json({examNotFound: 'exam not found'}))
// });



//  @route  GET api/exam/:examName/:id
//  @desc   GET needed question of selected exam
//  @access Public
// method 1

router.get('/:examName/:id', (req, res) =>
{
    Question.findOne({examName: req.params.examName})
        .then(exam => {

            Question.findOne({examName: req.params.examName},
                {totalQuestion: {$elemMatch: { questionId: req.params.id}}})
                .then(question =>{

                    let isFinished = false;
                    if(exam.totalNumber === req.params.id)
                    {
                        isFinished = true;
                        res.json([question.totalQuestion[0], isFinished]);
                    }
                    else
                    {
                        res.json([question.totalQuestion[0], isFinished]);
                    }
                })

        })
        .catch(err => res.status(404).json({examNotFound: 'exam not found'}))
});







module.exports = router;