const express = require('express')
const app = express()
const port = 3005
const connection = require('./conf')
const client = require('./conf')
const { body, validationResult } = require("express-validator")

app.use(express.urlencoded())

// respond to the GET request
app.get('/', (req, res) => {
    res.send('Welcome - you will be connected to our API')
})

app.get('/api/users', (req, res) => {
    client.query('SELECT * FROM users;')
     .then(data => res.json(data)) // We can send the data as a JSON
     .catch(e => res.send(e)); // In case of problem we send an HTTP code
 })

 app.get('/api/users/:id', (req, res) => {
    let {id} = req.params
    client.query(`SELECT * FROM users WHERE id = $1`, [id] , (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

//  app.post('/api/users', Validator, (req, res) => {
//     const {first_name, last_name, age} = req.body
//     client.query(`INSERT INTO users (first_name, last_name, age) VALUES($1, $2, $3)` , [first_name, last_name, age], (err, results) => {
//         if(err) throw err
//         res.json(results)
//     })
// }) 


app.post('/api/users', (req, res) => {
    const {first_name, last_name, age} = req.body
    client.query(`INSERT INTO users (first_name, last_name, age) VALUES('${first_name}', '${last_name}', '${age}')`, (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

app.listen(port, console.log(`Server is listening on port ${port}`))