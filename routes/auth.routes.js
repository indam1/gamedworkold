const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const nodemailer = require('nodemailer');

// /api/auth/register
router.post(
    '/register',
    [
        check('email')
            .isEmail()
            .withMessage('Некорректный email'),
        check('password')
            .isLength({min: 8})
            .withMessage('Минимальная длина пароля - 8 символов')
            .matches(/\d/)
            .withMessage('Пароль должен содержать число')
            .matches(/[A-Z]/)
            .withMessage('Пароль должен минимум одну заглавную букву')
            .matches(/[a-z]/)
            .withMessage('Пароль должен минимум одну строчную букву'),
        check('firstName')
            .isLength({min: 3})
            .withMessage('Минимальная длина имени - 3 символа')
            .matches(/\D/)
            .withMessage('Имя не может содержать число'),
        check('lastName')
            .isLength({min: 3})
            .withMessage('Минимальная длина фамилии - 3 символа')
            .matches(/\D/)
            .withMessage('Фамилия не может содержать число'),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }


            const {email, password, firstName, lastName} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }


            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email: email, password: hashedPassword, firstName: firstName, lastName: lastName, isConfirmed: false})

            await user.save()

            const us = await User.findOne({email})

            const token = jwt.sign(
                {userId: us.id},
                config.get('emailSecret'),
                {expiresIn: '1d'},
            )

            const url = `http://localhost:3000/confirmation/${token}`

            const transporter = nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'and00usa@gmail.com', // generated ethereal user
                        pass: 'U9v4s2o0a0n2.'  // generated ethereal password
                    },
                });

            transporter.sendMail({
                from: 'and00usa@gmail.com',
                to: email,
                subject: "Confirm Email",
                html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
            })

            res.status(201).json({message: "Пользователь создан"})


        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

// /api/auth/change
router.post('/change', [
    check('oldPassword')
        .isLength({min: 8})
        .withMessage('Минимальная длина пароля - 8 символов'),
    check('newPassword')
        .isLength({min: 8})
        .withMessage('Минимальная длина пароля - 8 символов')
        .matches(/\d/)
        .withMessage('Пароль должен содержать число')
        .matches(/[A-Z]/)
        .withMessage('Пароль должен минимум одну заглавную букву')
        .matches(/[a-z]/)
        .withMessage('Пароль должен минимум одну строчную букву'),
], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const {oldPassword, newPassword, email} = req.body
        const user = await User.findOne({email})

        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        await User.findOneAndUpdate({email}, {password: hashedPassword})

        res.status(201).json({message: "Пароль изменен"})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})


//api/auth/confirmation
router.get('/confirmation/:token', [], async (req, res) => {
    try {
        const id = jwt.verify(req.params.token, config.get("emailSecret"));
        const res = id.userId
        console.log(res)
        await User.findOneAndUpdate({_id: res}, {isConfirmed: true})
        res.status(201).json({message: "Подтверждено"})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router