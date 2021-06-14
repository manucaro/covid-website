const mongoose = require('mongoose');
const d = mongoose.model('death');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

/* GET api/deaths */
const deathsReadAll = (req, res) => {
    d
        .find({$or: [{covid19: 'Covid-19 Virus identificado'}, {covid19: 'Covid-19 Virus no identificado (sospechoso)'}]})
        .exec((err, deaths) => {
            if (!deaths) {
                sendJSONresponse(res, 404, { "message": "deaths not found" });
            } else if (err) { sendJSONresponse(res, 404, err); }
            else {
                sendJSONresponse(res, 200, deaths);
            }
        });
};

/* GET api/deaths/:id */
const deathsReadOne = (req, res) => {
    d
        .findById(req.params.id)
        .exec((err, deaths) => {
            if (!deaths) {
                sendJSONresponse(res, 404, { "message": "deaths not found" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            }
            else {
                sendJSONresponse(res, 200, deaths);
            }
        });
};

/* GET api/deaths-gender/:gender */
const deathsReadByGender = (req, res) => {
    const gender = req.params.gender;
    const genderC = gender.charAt(0).toUpperCase() + gender.substring(1);
    d
        .find().and([
            { $or: [{covid19: 'Covid-19 Virus identificado'}, {covid19: 'Covid-19 Virus no identificado (sospechoso)'}] },
            { $or: [{'sexo': genderC}] }
        ])
        .exec((err, deaths) => {
            if (!deaths) {
                sendJSONresponse(res, 404, { "message": "deaths not found" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            }
            else {
                sendJSONresponse(res, 200, deaths);
            }
        });
};

/* GET api/deaths-count-gender*/
const deathsCountGender = (req, res) => {
    d
        .countDocuments()
        .and([
            { $or: [{covid19: 'Covid-19 Virus identificado'}, {covid19: 'Covid-19 Virus no identificado (sospechoso)'}] },
            { $or: [{'sexo': 'Hombres'}] }
        ])
        .exec((err, countHombres) => {
            if (!countHombres) {
                sendJSONresponse(res, 404, { "message": "Hombres not found" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            }
            else {
                d
                    .countDocuments()
                    .and([
                        { $or: [{covid19: 'Covid-19 Virus identificado'}, {covid19: 'Covid-19 Virus no identificado (sospechoso)'}] },
                        { $or: [{'sexo': 'Mujeres'}] }
                    ])
                    .exec((err, countMujeres) => {
                        if (!countMujeres) {
                            sendJSONresponse(res, 404, { "message": "Mujeres not found" });
                        } else if (err) {
                            sendJSONresponse(res, 404, err);
                        } else {
                            var schema = new mongoose.Schema({
                                Hombres: { type: String, countHombres },
                                Mujeres: { type: String, countMujeres }
                            });
                            sendJSONresponse(res, 200, schema.obj);
                        }
                    });
            }
        });
};

module.exports = {
    deathsReadAll,
    deathsReadOne,
    deathsReadByGender,
    deathsCountGender
};