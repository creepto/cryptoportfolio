const https = require('https');
const portfolio = require('./portfolio.json');

const get = url => new Promise((resolve, reject) => {
  let data = '';
  https.get(url, res => {
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
    res.on('error', reject);
  });
});

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

const main = async () => {
  let result = await getCoins(portfolio);
  console.table(result);
  console.log('Last updated: ' + (new Date()).toLocaleString());
};

main();
