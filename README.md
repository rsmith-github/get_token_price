# WOR Token Price Tracker
This is a simple Node.js program that tracks the price of the WOR token on the Binance Smart Chain (BSC) using the PancakeSwap decentralized exchange.

## Installation
Clone the repository to your local machine.
Run npm install to install the required dependencies.

## Usage
Start the server by running npm start.
Connect to the server using a WebSocket client. For example, you can use the socket.io JavaScript library to connect to the server and receive live updates of the WOR token price.
The server exposes a REST API endpoint at http://localhost:3000/api/token-price that returns the current WOR token price in USDT.
You can use the provided index.html file to display the live WOR token price in your web browser.

## Dependencies
express: Web framework for Node.js
cors: Middleware for handling cross-origin resource sharing (CORS) in Express
socket.io: Library for implementing WebSockets in Node.js
web3: Library for interacting with the Binance Smart Chain (BSC) blockchain

## License
This program is licensed under the MIT license. See the LICENSE file for more information.