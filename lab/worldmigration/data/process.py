import re, json, time
from pygeocoder import Geocoder

import csv
threshold = 100000
migrations = {}

with open('T1.csv', 'rb') as f:
    reader = csv.reader(f)
    countries = reader.next()

    # Chop country name and Total etc. from country array
    countries = countries[1:-3]

    # Initialise
    for c in countries:
        migrations[c] = {'totalIn': 0, 'totalOut': 0, 'in': [], 'out': []}

    for row in reader:
        #Special case for final (total incoming) row
        if row[0] == 'TOTAL':
            for i, c in enumerate(row[1:-3]):
                inCountry = countries[i]
                if c == '':
                    c = '0'
                migrations[inCountry]['totalIn'] = int(c.replace(',',''))
            continue

        # Get total (at end of row)
        migrations[row[0]]['totalOut'] = int(row[-1].replace(',',''))

        # Chop off unspecified countries and total
        row = row[:-3]

        # print row
        for i, x in enumerate(row):
            x = x.replace(',','')
            try:
                amount = int(x)
            except:
                amount = 0
            if amount > threshold:
                outCountry = row[0]
                inCountry = countries[i-1]
                migrations[outCountry]['out'].append({'country': inCountry, 'amount': amount})
                migrations[inCountry]['in'].append({'country': outCountry, 'amount': amount})


# Geocode countries
# trimmedCountries = countries[1:-3]
# # trimmedCountries = countries[1:5]

# places = {}
# for c in trimmedCountries:
#     try:
#         results = Geocoder.geocode(c)
#         latlon = results[0].coordinates
#         places[c] = {'lat': latlon[0], 'lon': latlon[1]}
#         print c + ': ' + str(latlon)
#     except:
#         print 'Not got '+c
#     time.sleep(0.5)
#     fplaces = open('places.json', 'w')
#     json.dump(places, fplaces)


fo = open('migration.json', 'w')
json.dump(migrations, fo)
