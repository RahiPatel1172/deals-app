import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const Deal = mongoose.model('Deal', dealSchema);

export { Deal };