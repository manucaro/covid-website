const mongoose = require('mongoose');
const countHombres = require('./count-hombres');
const countMujeres = require('./count-mujeres');

const countGenderSchema = new mongoose.Schema({
    Hombres: {
        type: countHombres,
        required: true
    },
    Mujeres: {
        type: countMujeres,
        required: true
    }
});

mongoose.model('count-gender', countGenderSchema);