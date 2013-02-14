import re, json

def chunks(l, n):
    return [l[i:i+n] for i in range(0, len(l), n)]

f = open('maxtemp.txt')

f.readline()

data = {}
for i in range(1910, 2013):
    data[i] = [-1]*12

year = 1910
for l in f:
    l = l.strip()
    l = re.split(' *', l)
    # l = chunks(l, 2)

    for i in range(0, 12):
        data[year][i] = float(l[i+1])

    year = year + 1
    # for i, d in enumerate(l):
    #     if i == 12:
    #         break
    #     year = d[1]
    #     rainfall = d[0]
    #     data[int(year)][i] = float(rainfall)


print data
fo = open('maxtemp.json', 'w')
json.dump(data, fo)

