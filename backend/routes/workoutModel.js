const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workoutes
router.get('/', getWorkouts)

// GET a single workout - :id is parameter
router.get('/:id', getWorkouts)

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout)

// UPDATE a new workout
router.put('/:id', updateWorkout)

module.exports = router