const express = require('express')
const {
    createCar,
    getCars,
    getCar, 
    deleteCar,
    updateCar
} = require('../controllers/carController')

const router = express.Router()

// Retreive all cars record
router.get('/', getCars)

// Retreive a single car record
router.get('/:id', getCar)

// Create a new car record
router.post('/', createCar)
 
// DELETE an existing car record
router.delete('/:id', deleteCar)
 
// Update an existing car record
router.patch('/:id', updateCar)
 
module.exports = router