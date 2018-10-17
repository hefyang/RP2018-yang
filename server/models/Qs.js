const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const QuestionSchema = new Schema({

    examName: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        required: true
    },
    totalNumber: {
        type: String,
        required: true
    },
    totalQuestion: [
        {
            questionId: {
                type: String,
                required: true
            },
            questionTitle: {
                type: String,
                required: true
            },
            questionType:{
                type: String,
                required: true
            },
            options:[
                {
                    option: {
                        type: String,
                        required: true

                    },
                    questionDescription: {
                        type: String,
                        required: true
                    }
                }
            ],
            rightAnswer: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = Question = mongoose.model('questions', QuestionSchema);
