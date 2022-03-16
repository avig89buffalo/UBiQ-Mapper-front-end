import csv
import json
import os

basePath = "demo/python Scripts/groundTruths/"
destPath = "demo/python Scripts/cleaned"

def createJson(file):
    temp = []
    base = 60
    total = 0
    count = 0
    with open(f'{basePath}/{file.name}') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:

            if float(row[0]) > base:
                temp.append({"distance": base, "True Elevation": total/ count})
                total = 0
                count = 0
                base += 60
            else:
                total += float(row[1])
                count += 1
        


    with open(f'{destPath}/{file.name}.json', 'w') as outfile:
        outData = json.dumps(temp)
        json.dump(outData, outfile)


with os.scandir(basePath) as entries:
    for entry in entries:
        if entry.is_file() and entry.name.endswith('csv'):
            createJson(entry)







        
        


