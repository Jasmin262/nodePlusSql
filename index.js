const express = require('express')
const ordersRouter = require('./route/ordersRouter')
const app = express()
const port = 3005
const usersRouter = require('./route/usersRouter')


// respond to the GET request
app.get('/', (req, res) => {
    res.send('Welcome - you will be connected to our API')
})

app.use('/' , usersRouter, ordersRouter)



app.listen(port, console.log(`Server is listening on port ${port}`))