const mongoose = require('mongoose');

const countHombresSchema = new mongoose.Schema({
    countHombres: {
        type: Number,
        required: true
    }
});

mongoose.model('count-hombres', countHombresSchema);