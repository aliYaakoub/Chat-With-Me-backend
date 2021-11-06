import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        minlength:5,
        maxlength:50,
        required: true
    },
    to: {
        type: String,
        minlength:5,
        maxlength:50,
        required: true
    },
    content:{
        type: String,
        maxlength: 1000,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('Message', messageSchema);