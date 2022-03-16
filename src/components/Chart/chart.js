import React, { useRef, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }];
import maple_gt from "../../cleaned/maple_gt.csv.json"


export default function Chart(props) {
    const [dataSet, setDataSet] = useState([])

    const setupData = (data) => {
        let newData = []
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let total = 0
            for (let j = 0; j < data[i].length; j++) {
                console.log(i[j])
                // let transformedData = {
                //     error : data[i][j][2],
                //     longitude: data[i][j][0],
                //     latitude: data[i][j][1]
                // }
                total += data[i][j][2]
            }
            total /= data[i].length
            newData.push({ "Elevation": total, "distance": data[i][data[i].length - 1][3]  })
        }
        console.log(newData)
        return newData
    }

    useEffect(() => {
        // setupData(props.dataSet)
        setDataSet(setupData(props.dataSet))
    }, [props.dataSet])
    return <ResponsiveContainer width="100%" height="100%" >
    <LineChart  width="100%" >
        <YAxis />
        <XAxis  type='number' data={dataSet} dataKey="distance"  />
        <Tooltip />
        <Line type="natural" dot={false} data={dataSet} dataKey="Elevation" stroke="#475CB8" strokeWidth={3}  />
        <Legend verticalAlign="top" height={36} />
        <Line type="natural"  dot={false} data={JSON.parse(maple_gt)} dataKey="True Elevation" strokeWidth={3} stroke="#B8475C" />
    </LineChart>

    </ResponsiveContainer>

}