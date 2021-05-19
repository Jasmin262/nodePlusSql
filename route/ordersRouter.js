const express = require('express')
const app = express()
const port = 3005
const client = require('../conf')
// const { body, validationResult } = require("express-validator")
const ordersRouter = express.Router()

ordersRouter.use(express.urlencoded())

// respond to the GET request
ordersRouter.get('/', (req, res) => {
    res.send('Welcome - you will be connected to our API')
})

ordersRouter.get('/api/orders', (req, res) => {
    client.query('SELECT * FROM orders;')
     .then(data => res.json(data)) // We can send the data as a JSON
     .catch(e => res.send(e)); // In case of problem we send an HTTP code
 })

 ordersRouter.get('/api/orders/:id', (req, res) => {
    let {id} = req.params
    client.query(`SELECT * FROM orders WHERE id = $1`, [id] , (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

ordersRouter.post('/api/orders', (req, res) => {
    const {price, date, user_id} = req.body
    client.query(`INSERT INTO orders (price, date, user_id) VALUES('${price}', '${date}', '${user_id}')`, (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

ordersRouter.put('/api/orders/:id', (req, res) => {
    let {id} = req.params
    const {price, date, user_id} = req.body
    client.query(`UPDATE orders SET price='${req.body.price}', date='${date}', user='${user_id} WHERE ID = ${id}`, (err, results) => {
        if(err) throw err
        res.json(results)
    } )
})

ordersRouter.delete('/api/orders/:id', (req, res) => {
    let {id} = req.params
    client.query(`DELETE FROM users WHERE ID = ?`, Number(id), (err, results) => {
        if(err) throw err
        res.send('Order deleted')
    })
})

module.exports = ordersRouter;