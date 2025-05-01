

const express = require('express')

const { handleDNISData, handleHourlyData } = require('./controller');

const router = express.Router()


// Route handler

router.get("/api/dnis", handleDNISData);
router.get("/api/hourly/:dnis", handleHourlyData);


module.exports = router