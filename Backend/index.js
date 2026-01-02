const connecttoMongo = require('./db');
const express = require('express')
const cors = require('cors')
connecttoMongo();
const app = express()
const port = 5000

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Allow cross-origin requests from the frontend during development
//Available  Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

