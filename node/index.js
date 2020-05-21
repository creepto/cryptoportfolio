const https = require('https');
const portfolio = require('./portfolio.json');

/**
 * Call remote URL
 * @param {string} url 
 * @returns (Promise} promise object that resolves to the response
 */
const get = url => new Promise((resolve, reject) => {
  let data = '';
  https.get(url, res => {
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
    res.on('error', reject);
  });
});

/**
 * This function does 3 things:
 * 1. builds a URL from the portfolio
 * 2. calls the CoinGecko API to get the current coin prices
 * 3. Calculates the vaues of every coin and the total.
 * @param {array} coins the portfolio array
 * @returns {array} result
 */
const getCoins = async coins => {
  try {
    let ids = portfolio.map(e => e.coin).join(',');
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    let response = await get(url);
    response = JSON.parse(response)
    let total = 0;
    coins.forEach(c => {
      let usd = response[c.coin].usd;
      let value = usd * c.units;
      c.usd = '$' + usd.toFixed(3);
      c.value = '$' + value.toFixed(3);
      total += value;
    });
    //add total line
    coins.push({coin: 'Total', units: '', usd: '', value: '$' + total.toFixed(3)});
    return coins;
  }
  catch(err) {
    console.error(err);
  }
};

/**
 * Main function
 */
const main = async () => {
  let result = await getCoins(portfolio);
  console.table(result);
  console.log('Last updated: ' + (new Date()).toLocaleString());
};

//trigger main function
main();
