const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: {
       type: String,
       required: [true, 'Please add a todo!']
    }
})

module.exports = mongoose.model('fullstack', todoSchema, 'todo')
