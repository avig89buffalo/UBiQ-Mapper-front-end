import csv
import json
import os

basePath = "python Scripts/rawFiles"
destPath = "python Scripts/cleaned"
def createJson():
    with open(f'{basePath}/segmentData.csv','r',encoding='utf-8-sig') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0

        count = 0
        out = []
        temp = []
        base = 0
        dist = 0.0
        for row in csv_reader:
            i = 0
            f = 0
            p_dist = dist
            while i < len(row):
                if row[i] == "null":
                    f = 1
                    dist = p_dist
                    break
                else:
                    # temp.append([float(row[i+1]),float(row[i])])
                    temp.append([float(row[i+1]),float(row[i]), float(-1.31628946), round(dist,5)])
                    #if float(dist) - base > 15 : 
                        #base += 15
                    dist += float(0.19999)
                i += 2
            if(f == 0):
                out.append(temp)
            temp = []
            # if dist > 1000:
            #     break
        #print(out)

    with open(f'{destPath}/segmentsData.json', 'w') as outfile:
        outData = json.dumps(out)
        json.dump(outData, outfile)

createJson()
