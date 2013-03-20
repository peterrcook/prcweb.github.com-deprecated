# Take a file dump from the Chrome console such as
# 0: "353720"
# 1: "353719"
# 2: "350340"
# 3: "350089"
# and return an array of the values.
import re, json

f = open('exclusions.txt')

exclusions = []

for l in f:
    l = l.strip()
    l = l.replace('"', '')
    l = re.split(':', l)
    exclusions.append(int(l[1]))

print exclusions

fo = open('temp.json', 'w')
json.dump(exclusions, fo)

