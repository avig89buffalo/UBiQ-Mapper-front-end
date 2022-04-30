import csv
import json
import os

basePath = "."
destPath = "."

out = {'segment':{'segment_id': 2,'nodes':[]}}

def createJson(file):
    with open(f'{basePath}/{file.name}','r',encoding='utf-8-sig') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0

        node_list = []

        for row in csv_reader:
            #print(row)
            node_list.append({'latitude':float(row[0]),'longitude':float(row[1]),'distance':float(row[2]),'elevation':float(row[3])})
        
        out['segment']['nodes'] = node_list

with os.scandir(basePath) as entries:
    for entry in entries:
        if entry.is_file() and entry.name.endswith('csv'):
            createJson(entry)

    with open(f'{destPath}/segmentData.json', 'w') as outfile:
        #outData = json.dumps(out)
        json.dump(out, outfile)
