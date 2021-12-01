const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const config = require('config')
const Course = require('../models/Course')

router.get('/courses', auth, async (req, res) => {
    try {
        const courses = await Course.find({}).populate('owner')
        res.json(courses)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.get('/mycourses', auth, async (req, res) => {
    try {
        const courses = await Course.find({owner: req.user.userId}).populate('owner')
        res.json(courses)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {name} = req.body

        const course = new Course({
            name: name, description: name, owner: req.user.userId, objects: null
        })

        await course.save()

        res.status(201).json({course})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.post('/create/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (course.owner.toString() !== req.user.userId) {
            res.status(400).json({message: "Этот курс создан не вами"})
        }

        res.status(201).json({course})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.post('/update/:id', auth, async (req, res) => {
    try {
        const {objects} = req.body

        const course = await Course.findByIdAndUpdate(req.params.id, {objects: objects})

        if (course.owner.toString() !== req.user.userId) {
            res.status(400).json({message: "Этот курс создан не вами"})
        }
        res.status(201).json({message :"Курс изменен", id: course._id})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

module.exports = router