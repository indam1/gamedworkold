const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/course', require('./routes/courses.routes'))
app.use('/api/forum', require('./routes/forum.routes'))


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true
        })
    } catch (e) {
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

start()

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))