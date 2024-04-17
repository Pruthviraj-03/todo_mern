import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const todoSchema = new Schema({
    todos: [{
        _id: mongoose.Types.ObjectId,
        title: {
            type: String,
            required: true,
            maxlength: 10
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        todotasks: [{
            _id: mongoose.Types.ObjectId,
            value: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
        }],
    }],
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };
