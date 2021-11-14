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
    isOnline: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('User', userSchema);