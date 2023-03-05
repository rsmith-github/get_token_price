const express = require('express');

// Create an instance of the express application
const app = express();
const returnPrice = require('./tokenPrice');
const cors = require('cors');

app.use(cors())

// Define a route for the API endpoint
app.get('/api/token-price', async (_req, res) => {
    const price = await returnPrice()
    const data = {
        price: price
    };
    console.log(data.price);
    // Send the data as a JSON response
    res.json(data);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
