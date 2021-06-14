const express = require('express');
const router = express.Router();

const ctrlHealthZones = require('../controllers/health-zones');
const ctrlDeaths = require('../controllers/deaths');
const ctrlVaccination = require('../controllers/vaccination');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// SCHEMAS 

/**
 * @swagger
 * components:
 *   schemas:
 *     deaths:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: death's ID.
 *           example: 0
 *         covid19:
 *           type: string
 *           description: covid-19 identificated or not.
 *           example: Covid-19 Virus identificado
 *         mes_defuncion:
 *           type: string
 *           description: month of the defunction.
 *           example: Enero
 *         sexo:
 *           type: string
 *           description: gender of the person.
 *           example: Mujeres
 *         edad:
 *           type: string
 *           description: age range of the person.
 *           example: De 80 a 84 años
 *         total:
 *           type: integer
 *           description: total of deaths.
 *           example: 1666
 *     count-gender:
 *       type: object
 *       properties:
 *         Hombres:
 *           $ref: '#/components/schemas/count-hombres' 
 *         Mujeres:
 *           $ref: '#/components/schemas/count-mujeres'
 *     count-hombres:
 *       type: object
 *       properties:
 *         countHombres:
 *           type: integer
 *     count-mujeres:
 *       type: object
 *       properties:
 *         countMujeres:
 *           type: integer
 *     health-zones:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: health zone's ID.
 *           example: 0
 *         zona_basica_salud:
 *           type: string
 *           description: health zone's name.
 *           example: Almeria
 *         tasa_incidencia_acumulada_total:
 *           type: number
 *           description: total rate of covid cases in the health zone.
 *           example: 19.55
 *         fecha_informe:
 *           type: string
 *           description: date when the information was stored.
 *           example: 10/06/2021
 *         casos_confirmados_totales:
 *           type: integer
 *           description: total covid cases in the health zone.
 *           example: 100
 *     vaccination:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: death's ID.
 *           example: 0
 *         comunidad_autonoma:
 *           type: string
 *           description: region.
 *           example: Almería
 *         porcentaje_primera_dosis:
 *           type: integer
 *           description: percentage of first dose.
 *           example: 58
 *         porcentaje_segunda_dosis:
 *           type: integer
 *           description: percentage of second dose.
 *           example: 46
 *         porcentaje_total:
 *           type: string
 *           description: total percentage.
 *           example: 73
 *         fecha:
 *           type: string
 *           description: date.
 *           example: 07/01/2020
 *     resource-not-found:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/deaths:
 *   get:
 *     summary: Retrieves a list of covid's deaths
 *     description: Retrieves a list of covid's deaths 
 *     tags:
 *       - deaths
 *     responses:
 *       200:
 *         description: A list of deaths.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/deaths'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/deaths', ctrlDeaths.deathsReadAll);

/**
 * @swagger
 * /api/deaths/{id}:
 *   get:
 *     summary: Retrieves a death
 *     description: Retrieves a death with the information
 *     tags:
 *       - deaths
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the death to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: One death.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/deaths'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/deaths/:id', ctrlDeaths.deathsReadOne);

/**
 * @swagger
 * /api/deaths-gender/{gender}:
 *   get:
 *     summary: Retrieves a list of covid's deaths by gender
 *     description: Retrieves a list of covid's deaths by gender
 *     tags:
 *       - deaths
 *     parameters:
 *       - in: path
 *         name: gender
 *         required: true
 *         description: Gender of the person.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of deaths by a given gender.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/deaths'
  *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/deaths-gender/:gender', ctrlDeaths.deathsReadByGender);

/**
 * @swagger
 * /api/deaths-count-gender:
 *   get:
 *     summary: Retrieves two numbers of total deaths by gender
 *     description: Retrieves two numbers of total deaths by gender "Hombres" and gender "Mujeres"
 *     tags:
 *       - deaths
 *     responses:
 *       200:
 *         description: Two numbers with the total deaths by gender "Hombres" and gender "Mujeres".
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/count-gender'
  *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/deaths-count-gender', ctrlDeaths.deathsCountGender);

/**
 * @swagger
 * /api/health-zones:
 *   get:
 *     summary: Retrieves a list of health zones
 *     description: Retrieves a list of covid confirmed cases from the health zones. 
 *     tags:
 *       - health-zones
 *     responses:
 *       200:
 *         description: A list of health zones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/health-zones'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/health-zones', ctrlHealthZones.healthZonesReadAll);


/**
 * @swagger
 * /api/health-zones/{id}:
 *   get:
 *     summary: Retrieves a health zone
 *     description: Retrieves a health zone with the information
 *     tags:
 *       - health-zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the health zone to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: One health zone.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/health-zones'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/health-zones/:id', ctrlHealthZones.healthZoneReadOne);

/**
 * @swagger
 * /api/health-zones/{id}:
 *   patch:
 *     summary: Applies some changes to a health zone
 *     description: Applies some changes to the health zone
 *     tags:
 *       - health-zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the health zone to patch.
 *         schema:
 *           type: integer
 *       - name: health-zone
 *         in: body
 *         required: true
 *         description: The health-zone. The entire object is not required.
 *         schema:
 *           $ref: '#/components/schemas/health-zones'
 *     responses:
 *       200:
 *         description: The health zone patched.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/health-zones'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.patch('/health-zones/:id', ctrlHealthZones.healthZonePatch);

/**
 * @swagger
 * /api/vaccination:
 *   get:
 *     summary: Retrieves a list of people vaccinated
 *     description: Retrieves a list of percentage of people vaccinated by region
 *     tags:
 *       - vaccination
 *     responses:
 *       200:
 *         description: A list of percentage of people vaccinated.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/vaccination'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/vaccination', ctrlVaccination.vaccinationReadAll);

/**
 * @swagger
 * /api/vaccination/{id}:
 *   get:
 *     summary: Retrieves a vaccination
 *     description: Retrieves a vaccination with the information
 *     tags:
 *       - vaccination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the vaccination to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: One vaccination.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/vaccination'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.get('/vaccination/:id', ctrlVaccination.vaccinationReadOne);

/**
 * @swagger
 * /api/vaccination:
 *   post:
 *     tags:
 *       - vaccination
 *     summary: Adds a new vaccination instance
 *     description: Adds a new vaccination instance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vaccination
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/vaccination'
 *     responses:
 *       201:
 *         description: Successfully added
 *       500:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.post('/vaccination', ctrlVaccination.vaccinationCreate);

/**
 * @swagger
 * /api/vaccination/{id}:
 *   delete:
 *     summary: Removes a vaccination
 *     description: Removes a vaccination
 *     tags:
 *       - vaccination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the vaccination to remove.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaccination removed.
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.delete('/vaccination/:id', ctrlVaccination.vaccinationDelete);

/**
 * @swagger
 * /api/vaccination/{id}:
 *   put:
 *     summary: Updates a vaccination
 *     description: Updates a vaccination
 *     tags:
 *       - vaccination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the vaccination to update.
 *         schema:
 *           type: integer
 *       - name: vaccination
 *         in: body
 *         required: true
 *         description: The vaccination. The entire object is required.
 *         schema:
 *           $ref: '#/components/schemas/vaccination'
 *     responses:
 *       200:
 *         description: The vaccination updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/vaccination'
 *       404:
 *         description: Message of error.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resource-not-found'
*/
router.put('/vaccination/:id', ctrlVaccination.vaccinationPut);

module.exports = router;
