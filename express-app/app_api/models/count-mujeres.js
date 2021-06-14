const mongoose = require('mongoose');

const countMujeresSchema = new mongoose.Schema({
    countMujeres: {
        type: Number,
        required: true
    }
});

mongoose.model('count-mujeres', countMujeresSchema);