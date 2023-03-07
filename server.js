const express = require('express');
const app = express();
const returnPrice = require('./tokenPrice');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"]
    }
});

app.use(cors());

// api endpoint
app.get('/api/token-price', async (req, res) => {
    const price = await returnPrice();
    const data = {
        price: price
    };

    // Emit the price data to all connected clients
    io.emit('price', data);

    // Send the data as a JSON response
    res.json(data);
});

const updatePrice = async (socket) => {
    const intervalId = setInterval(async () => {
        const price = await returnPrice()
        const data = {
            price: price
        };
        socket.emit('price', data);
    }, 10000);

    // Store the interval ID for this socket
    socket.intervalId = intervalId;
}

io.on('connection', (socket) => {
    console.log('A client connected');

    // Send the initial price data to the connected client
    socket.emit('price', { price: 0 });

    // Send the latest price data to the connected client whenever it changes
    returnPrice().then((price) => {
        const data = {
            price: price
        };
        socket.emit('price', data);
    });

    // Listen for disconnection events
    socket.on('disconnect', () => {
        // Clear the interval for this socket
        clearInterval(socket.intervalId);
        console.log('A client disconnected. Interval cleared.');
    });

    // Call the updatePrice function to set up the interval
    updatePrice(socket);
});

// Start the server
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
