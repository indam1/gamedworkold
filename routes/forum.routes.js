const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const config = require('config')
const Course = require('../models/Course')
const Discussion = require('../models/Discussion')
const Message = require('../models/Message')

router.get('/', auth, async (req, res) => {
    try {
        const discussions = await Discussion.find({})
        res.json(discussions)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {theme} = req.body

        const discussion = new Discussion({
            theme: theme, creator: req.user.userId
        })

        await discussion.save()

        res.status(201).json({discussion})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.post('/send/:id', auth, async (req, res) => {
    try {
        const {text} = req.body

        const message = new Message({
            text: text, sender: req.user.userId, discussion: req.params.id
        })

        await message.save()

        res.status(201).json({message})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id)
        const messages = await Message.find({discussion: req.params.id})
        res.json({discussion, messages})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})



module.exports = router