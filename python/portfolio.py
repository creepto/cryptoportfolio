import requests
import json
from string import Template
from datetime import datetime

#Load portfolio json file
with open('portfolio.json') as f:
  portfolio = json.load(f)

# Portfolio and currecny/ies
currency = 'usd'

#Build URL
coins = []
for c in portfolio:
  coins.append(c['coin'])
vars = dict(ids = ','.join(coins), currency = currency)
url = Template('https://api.coingecko.com/api/v3/simple/price?ids=$ids&vs_currencies=$currency').substitute(vars)

#Call API
result = requests.get(url=url).json()

#Parse results
total = 0
for c in portfolio:
  c['price'] = result[c['coin']][currency]
  c['value'] = c['units'] * c['price'];
  total = total + c['value'];

#Print table
print('{:<10} {:<12} {:<10} {:<10}'.format('Coin','Units','Price','Value'))
for r in portfolio:
  print('{:<10} {:<12} {:<10} {:<10}'.format(r['coin'],r['units'],r['price'],r['value']))
print('Total: {:>39}'.format(total))
print('Last updated: ', datetime.now())
