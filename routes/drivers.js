const express = require('express')
const {
    getDrivers,
    getDriver,
    createDriver,
    deleteDriver,
    updateDriver
} = require('../controllers/driverController')
const router = express.Router()

// Retreive all drivers record
router.get('/', getDrivers)

// Retreive a single driver record
router.get('/:id', getDriver)

// Create a new driver record
router.post('/', createDriver)
 
// DELETE an existing driver record
router.delete('/:id', deleteDriver)
 
// Update an existing driver record
router.patch('/:id', updateDriver)
 
module.exports = router