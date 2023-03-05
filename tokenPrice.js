// Inspired by https://gist.github.com/Linch1/ede03999f483f2b1d5fcac9e8b312f2c

/*
How it works?
This script simply comunicates with the smart contract deployed by pancakeswap and calls the main
function that was build to retrive the token prices
*/

let pancakeSwapAbi = [
    { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" },
];

// import web3 package
const Web3 = require('web3');

// "PancakeSwap V2 Router 2" smart contract is a smart contract that allows users to swap tokens on the PancakeSwap decentralized exchange
let pancakeSwapContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();

// calculate usdt price of token
async function returnPrice() {

    // calculate usdt price of token
    let usdtPrice = await calcUSDTPrice()

    // convert to float
    let floatValue = parseFloat(usdtPrice).toFixed(2)

    // console.log(`CURRENT USDT PRICE: ${floatValue}`);

    return floatValue
}



// Function to return price in USDT
async function calcUSDTPrice() {
    const web3 = new Web3("https://bsc-dataseed1.binance.org"); // Binance Smart Chain (BSC) public node endpoint.
    const USDTTokenAddress = "0x55d398326f99059ff775485246999027b3197955"; // USDT
    const tokenAddress = '0xd6edbB510af7901b2C049ce778b65a740c4aeB7f' // WOR
    let usdtToSell = web3.utils.toWei("1", "ether");
    let amountOut;
    try {
        let router = await new web3.eth.Contract(pancakeSwapAbi, pancakeSwapContract);
        amountOut = await router.methods.getAmountsOut(usdtToSell, [tokenAddress, USDTTokenAddress]).call();
        amountOut = web3.utils.fromWei(amountOut[1]);
    } catch (error) {
        console.log(error);
    }

    if (!amountOut) return 0;
    return amountOut;
}



module.exports = returnPrice;