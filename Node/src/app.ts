import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Time Pass'))

app.listen(6300, () => console.log('Listening on port 6300'))