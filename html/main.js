/**
 * This function does 3 things:
 * 1. builds a URL from the portfolio
 * 2. calls the CoinGecko API to get the current coin prices
 * 3. Calculates the vaues of every coin and the total.
 * @param {Array} coins the portfolio array
 */
const getCoins = async coins => {
  const CoinGeckoAPI = 'https://api.coingecko.com/api/v3/simple/price';
  try {
    //get all ids
    let ids = coins.map(e => e.coin).join(',');
    //get the currency to convert to (can be more than one - just add comma separated list)
    let currency = 'usd';
    //create the API URL
    let url = `${CoinGeckoAPI}?ids=${ids}&vs_currencies=${currency}`;
    //call API and convert the result
    let response = await (await fetch(url)).json();
    //iterate through the portfolio and calculate the coin value
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
    alert('Error occured calling CoinGecko (check console)');
  }
};

/**
 * Convert a JSO object to an HTML table, and present it
 * @param {object} json the calculated portfolio
 * @param {string} divResult the HTML element that will hoist the result table
 */
const jsonToTable = (json, divResult) => {
  let col = [];
  for (let i = 0; i < json.length; i++) {
    for (let key in json[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  let table = document.createElement('table');
  let tr = table.insertRow(-1);

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  for (let i = 0; i < json.length; i++) {
    tr = table.insertRow(-1);
    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json[i][col[j]];
    }
  }
  let divContainer = document.getElementById(divResult);
  divContainer.innerHTML = '';
  divContainer.appendChild(table);
};

const main = async () => {
  //calculate the current portfolio value
  let coins = await getCoins(portfolio);
  //show the result as an HTML table
  jsonToTable(coins, 'portfolio');
  //show current date
  document.getElementById('date').innerHTML = (new Date()).toLocaleString();
};
