require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const authRouter = require('./routes/auth')


const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.unftbsr.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
    console.log('MongoDB connected');
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

app.use(express.json())
app.use('/api/auth', authRouter)

const PORT = 5000

app.listen(PORT , () => console.log(`Server started on port ${PORT}`))

