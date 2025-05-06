import mongoose from 'mongoose';

const counsellorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Counsellor = mongoose.model('Counsellor', counsellorSchema);



export default Counsellor;