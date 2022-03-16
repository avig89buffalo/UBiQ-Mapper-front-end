import csv
import json
import os

basePath = "demo/python Scripts/rawFiles/"
destPath = "demo/python Scripts/cleaned"
def createJson(file):
    with open(f'{basePath}/{file.name}') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0

        count = 0
        out = []
        temp = []
        base = 0
        for row in csv_reader:
            temp.append([float(row[1]),float(row[0]), float(row[3]), float(row[2])])
            if float(row[2]) - base > 60 : 
                out.append(temp)
                temp = []
                base += 60

    with open(f'{destPath}/{file.name}.json', 'w') as outfile:
        outData = json.dumps(out)
        json.dump(outData, outfile)


with os.scandir(basePath) as entries:
    for entry in entries:
        if entry.is_file() and entry.name.endswith('csv'):
            createJson(entry)







        
        


