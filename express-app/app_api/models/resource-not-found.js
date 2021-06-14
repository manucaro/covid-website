const mongoose = require('mongoose');

const resourceNotFoundSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

mongoose.model('resourceNotFound', resourceNotFoundSchema);