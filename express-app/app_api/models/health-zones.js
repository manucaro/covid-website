const mongoose = require('mongoose');

const healthZonesSchema = new mongoose.Schema({
    zona_basica_salud: {
        type: String,
        required: true
    },
    tasa_incidencia_acumulada_ultimos_14dias: {
        type: Number,
        required: true
    },
    tasa_incidencia_acumulada_activos_ultimos_14dias: Number,
    tasa_incidencia_acumulada_total: {
        type: Number,
        required: true
    }, 
    fecha_informe: Date,
    casos_confirmados_ultimos_14dias: {
        type: Number,
        required: true
    },
    casos_confirmados_activos_ultimos_14dias: Number,
    casos_confirmados_totales: {
        type: Number,
        required: true
    }
});

mongoose.model('health_zones', healthZonesSchema);