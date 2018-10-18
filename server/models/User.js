const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    history: [
        {
            examName: {
                type: String,
                required: true
            },
            examType: {
                type: String,
                required: true
            },
            totalQuestionNumber: {
                type: String,
                required: true
            },
            result: [
                {
                    questionId: {
                        type: String,
                        required: true
                    },
                    questionType:{
                        type: String,
                        required: true
                    },
                    answerResult: {
                        type: Boolean,
                        required: true
                    }
                }
            ],
            times: {
                type: String,
                required: true
            }
        }

    ]
});

module.exports = User = mongoose.model('users', UsersSchema);
