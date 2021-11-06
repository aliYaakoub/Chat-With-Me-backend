import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    username:{
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    inbox:[ String ]
});

export default mongoose.model('User', userSchema);