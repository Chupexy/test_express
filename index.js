const express = require('express');
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const Members = require('./Members')

//parse incoming data
app.use(express.json())

app.use('/members', require('./routes/members'))

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})