const express = require('express')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./database')
const ApiRoute = require('./routes/chapters.routes')
const cors = require('cors');

const app = express()

mongoose.connect(MONGO_URI).then(() => {
    console.log('✅ connexion a MongoDB établie')
}).catch(error => {
    console.log(error)
})
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));

app.use('/api', ApiRoute)

app.listen(3000, () => {
    console.log('✅ Server is running on port 3000')
})