const express = require('express')
const app = express()
const port = 3005
const client = require('../conf')
// const { body, validationResult } = require("express-validator")
const usersRouter = express.Router()

usersRouter.use(express.urlencoded())

// respond to the GET request
usersRouter.get('/', (req, res) => {
    res.send('Welcome - you will be connected to our API')
})

usersRouter.get('/api/users', (req, res) => {
    client.query('SELECT * FROM users;')
     .then(data => res.json(data)) // We can send the data as a JSON
     .catch(e => res.send(e)); // In case of problem we send an HTTP code
 })

 usersRouter.get('/api/users/:id', (req, res) => {
    let {id} = req.params
    client.query(`SELECT * FROM users WHERE id = $1`, [id] , (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

usersRouter.post('/api/users', (req, res) => {
    const {first_name, last_name, age} = req.body
    client.query(`INSERT INTO users (first_name, last_name, age) VALUES('${first_name}', '${last_name}', '${age}')`, (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

usersRouter.put('/api/users/:id', (req, res) => {
    let {id} = req.params
    const {first_name, last_name, age} = req.body
    client.query(`UPDATE users SET first_name='${req.body.first_name}', last_name='${last_name}', age='${age}'  WHERE ID = ${id}`, (err, results) => {
        if(err) throw err
        res.json(results)
    } )
})

usersRouter.delete('/api/users/:id', (req, res) => {
    let {id} = req.params
    client.query(`DELETE FROM users WHERE ID = ?`, Number(id), (err, results) => {
        if(err) throw err
        res.send('User deleted')
    })
})

module.exports = usersRouter;