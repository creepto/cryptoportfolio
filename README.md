# Crypto Portfolio

This repo contains 3 separate code bases that use the [CoinGecko API](https://www.coingecko.com/en/api) to retrieve the current values of your coins. It's meant for education purposes only - **these are by no means a complete/tested product**.

## Usage

You'll need to update a JSON array with the coin symbols you want and the units you have. After the apps run, the current dollar value and the total will be displayed.

### Getting the symbols

To get all available coin symbols for your portfolio, go to [this API response](https://api.coingecko.com/api/v3/coins/list) and search for your coins.

### Portfolio structure

```json
[
  {
    "coin": "bitcoin",
    "units": 1.123
  },
  {
    "coin": "ethereum",
    "units": 37
  },
  {
    "coin": "cardano",
    "units": 10000
  }
]
```

## Available applications

### 1. HTML app

#### Requirements

1. A modern browser
1. A text editor

#### Usage

1. Edit the file "portfolio.js" with the coins you have, and the number of units.
1. Open "portfolio.html in the browser.

### 2. Python app

#### Requirements

1. Python3 (though 2.7 may work as well with tiny adjustments)
1. A text editor

#### Usage

1. Update the portfolio variable in the file `portfolio.py` with the coins you have, and the number of units.
1. Use your console/terminal app to get to the `Python` folder, and run `python portfolio.py` from the command line.

### 3. Node.JS app

#### Requirements

1. Node.JS installed (check [https://nodejs.org/](https://nodejs.org/) to get the version that runs on your OS).
1. Text editor

#### Usage

1. Edit the file "portfolio.js" with the coins you have, and the number of units.
1. run `node index` in the `Node` folder. If you've installed NPM, you can also run `npm start` in the `Node` folder.


## License

The source is licensed under MIT license. Feel free to use it, change it, and do whatever you want with it 😀.

## Donation

If you feel like it, drop some ETH, BAT, DAI, whatever at **[guy.wantsome.eth](https://etherscan.io/address/guy.wantsome.eth)**.
