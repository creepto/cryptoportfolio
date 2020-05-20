const getCoins = async coins => {
  try {
    let ids = coins.map(e => e.coin).join(',');
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    let response = await (await fetch(url)).json();
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
  let coins = await getCoins(portfolio);
  jsonToTable(coins, 'portfolio');
};
