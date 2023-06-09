require('dotenv').config()

const express  = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routers/auth')
const skillRouter = require('./routers/skill')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bfoo75j.mongodb.net/learnit?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/skill', skillRouter)


const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))