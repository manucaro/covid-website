const mongoose = require('mongoose');
const v = mongoose.model('vaccination');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

/* GET api/vaccination */
const vaccinationReadAll = (req, res) => {
    v
        .find({}).sort({ fecha: 1 })
        .exec((err, vaccination) => {
            if (!vaccination) {
                sendJSONresponse(res, 404, { "message": "vaccination not found" });
            } else if (err) {
                sendJSONresponse(res, 404, err);
            }
            else {
                sendJSONresponse(res, 200, vaccination);
            }
        });
};

/* GET api/vaccination/:id */
const vaccinationReadOne = (req, res) => {
    v.
    findById(req.params.id)
    .exec((err, vaccination) => {
        if(!vaccination){
            sendJSONresponse(res, 404, {"message": "vaccination not found"});
        } else if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, vaccination);
        }
    });
};

/* POST api/vaccination */
const vaccinationCreate = (req, res) => {
    v.create({
        comunidad_autonoma: req.body.comunidad_autonoma,
        porcentaje_primera_dosis: req.body.porcentaje_primera_dosis,
        porcentaje_segunda_dosis: req.body.porcentaje_segunda_dosis,
        porcentaje_total: req.body.porcentaje_total,
        fecha: req.body.fecha
    }, (err, vaccination) => {
        if (err) {
            sendJSONresponse(res, 500, { "message": "can not create" });
        } else {
            sendJSONresponse(res, 201, vaccination);
        }
    });
};

/* DELETE api/vaccination/:id */
const vaccinationDelete = (req, res) => {
    const id = req.params.id;
    if (req.params.id) {
        v
            .findByIdAndRemove(id)
            .exec((err, vaccination) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                }
                console.log("Vaccination " + id + " deleted");
                sendJSONresponse(res, 204, null);
            }
            );
    } else {
        sendJSONresponse(res, 404, { "message": "No vaccination" });
    }
};

/* PUT api/vaccination/:id */
const vaccinationPut = (req, res) => {
    const _id = req.params.id;
    v.
    findByIdAndUpdate(
          _id, 
          {comunidad_autonoma: req.body.comunidad_autonoma,
          porcentaje_primera_dosis: req.body.porcentaje_primera_dosis,
          porcentaje_segunda_dosis: req.body.porcentaje_segunda_dosis,
          porcentaje_total: req.body.porcentaje_total,
          fecha: req.body.fecha },
        {new: true})
        .exec((err, vaccination) => {
            if(!vaccination){
                sendJSONresponse(res, 404, {"message": "vaccination not found"});
            } else if(err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, vaccination);
            }
        },);
};

module.exports = {
    vaccinationReadAll,
    vaccinationReadOne,
    vaccinationCreate,
    vaccinationDelete,
    vaccinationPut
};