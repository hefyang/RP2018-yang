const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// Load Input Validation
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

//  @route  GET api/users/test
//  @desc   Test users route
//  @access Public
router.get('/test', (req, res)=> res.json({msg: "users works"}));

// this route should be adjust to check
// if the username has existed in the database.
// the API should be POST api/user with username.
router.get('/', (req, res) =>{
    User.find()
        .then(user => res.json(user));
});

//  @route  GET api/users/register
//  @desc   Register user
//  @access Public
// USE

// this route should be adjust to create a new user account
// with user's username, email, and password
router.post('/register', (req, res)=> {

    // check the isvalid (true or false)
    const {errors, isValid} = validationRegisterInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check the user email from database
    User.findOne({ username: req.body.username})
        .then(user => {
            if(user){
                // If user use a existing email to register
                errors.username = 'Username already exists';
                return res.status(400).json(errors);
            }
            else
            {

                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt) =>{
                    // use 'salt' Create randomly string into the hash
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.json(user);
                            })
                            .catch(err => console.log(err));

                    });
                });
            }
        });
});


//  @route  GET api/users/login
//  @desc   Login user / Returning JWT Token
//  @access Public
// USE

router.post('/login', (req, res) => {
    const {errors, isValid} = validationLoginInput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    // Find user by email

    User.findOne({ username })
        .then(user => {
            // Check for user
            if(!user){
                errors.username = 'User not found';
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        //  res.json({msg: 'Success'});
                        //  User Matched
                            const payload = { id: user.id, username: user.username}; //   Create JWT payload

                            //  Sign Token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 7200},
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        id: user.id,
                                        expiredIn: 7200,
                                        idToken: 'Bearer ' + token
                                    });
                                });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});



//  @route  GET api/users/current
//  @desc   Return current user
//  @access Private
// USE

router.get('/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            username: req.user.username,
            history: req.user.history
        });
    });


//  @route  GET api/users/:user_id/history
//  @desc   Return current user
//  @access Private
// USE

router.get('/:user_id/history',
    (req, res) => {
        User.findOne({_id: req.params.user_id})
            .then(user =>{
                res.json(user.history);
            })
            .catch(err => res.status(404).json({userNotFound: 'user not found'}));
    });





//  @route  Post api/users/:user_id/history
//  @desc   Create exam table
//  @access Private
// USE

router.post('/:user_id/history',
    (req, res) =>
{
    User.findById({_id: req.params.user_id})
        .then(user =>
        {
            let times = 1;

            user.history.map(exam =>{
                if(exam.examName.toString() === req.body.examName)
                {
                    return  times = times + 1;
                }
            });

            const newExamTable = {
                examName: req.body.examName,
                examType: req.body.examType,
                totalQuestionNumber: req.body.totalQuestionNumber,
                times: times
            };

            user.history.unshift(newExamTable);

            const payload = {
                examName: req.body.examName,
                times: times
            };
            user.save().then(user => res.json(payload));

        })
        .catch(err => res.status(404).json({userNotFound: 'user not found'}));

});


//  @route  Post api/users/:user_id/history/:examName
//  @desc   Save exam answer
//  @access Private
// USE

router.post('/:user_id/history/:examName',
    (req, res) => {


    User.findById({_id: req.params.user_id})
        .then(user =>{
            user.history.map(exam =>
            {
                if(exam.examName === req.params.examName
                    && exam.times === req.body.times)
                {
                    let isCreated = false;
                    exam.result.map(answer =>
                    {
                        if(answer.questionId === req.body.questionId)
                        {
                            return isCreated = true;
                        }

                    });
                    
                    if(!isCreated)
                    {
                        const newResult = {
                            questionId: req.body.questionId,
                            questionType: req.body.questionType,
                            answerResult: req.body.answerResult
                        };

                        exam.result.unshift(newResult);
                        user.save().then(send => res.json(user));
                    }
                    else
                    {
                        // Get remove Index

                        const removeIndex = exam.result
                            .map(item => item.questionId.toString())
                            .indexOf(req.body.questionId);

                        // Splice comment out of array
                        exam.result.splice(removeIndex, 1);

                        const newResult = {
                            questionId: req.body.questionId,
                            questionType: req.body.questionType,
                            answerResult: req.body.answerResult
                        };

                        exam.result.unshift(newResult);

                        user.save().then(send => res.json(user));
                    }

                }
            })
        })
        .catch(err => res.status(404).json({userNotFound: 'user not found'}))
});


//  @route  Get api/users/history/:examName/:times
//  @desc   Get result of the exam
//  @access Private
// Diagram value

router.get('/:user_id/history/:examName/:times',
    (req, res) =>{
    
    User.findOne({_id: req.params.user_id}, {history: { $elemMatch: {examName: req.params.examName, times: req.params.times}}})
        .then(exam => {

            let questionSort = exam.history[0].result.sort((a,b) =>{
                let typeA = a.questionType.toLowerCase();
                let typeB = b.questionType.toLowerCase();
                if(typeA < typeB)
                {
                    return -1;
                }

                if(typeA > typeB)
                {
                    return 1;
                }

                return 0
            });

            const distinctType = [...new Set(questionSort.map(question => question.questionType))];

            let countTypeMap = [];
            for (i =0; i < distinctType.length; i++)
            {
                countTypeMap.push({
                    questionType: distinctType[i].toString(),
                    totalRight: 0,
                    totalWrong: 0
                });

                questionSort.map(question => {
                    if(question.questionType === distinctType[i])
                    {

                        if(question.answerResult === true)
                        {
                            countTypeMap[i].totalRight ++;
                        }
                        else
                        {
                            countTypeMap[i].totalWrong ++;
                        }
                    }
                })
            }


            let hitMap= [];

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            for (k = 0; k < questionSort.length; k++)
            {
                hitMap.push({
                    questionType: questionSort[k].questionType,
                    answerResult: getRandomInt(10)
                })
            }



            res.json([countTypeMap, hitMap]);
        });
    });







module.exports = router;