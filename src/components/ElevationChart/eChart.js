import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const getAverage = (arr) => {
  let total = 0
  let chartData = []
  let step = parseFloat(301)
  let dist = 0
  let j = parseFloat(0)
  //100 coordinates = 20 m
  for(var i = 0; i < arr.length; i++){
      j++;
      total += parseFloat(arr[i])
      if(j == step || i == arr.length - 1){
        let elev = -(total/j)
        // if (elev < 0)
        //   elev = [elev, -3]
       chartData.push({distance : dist, elevation: elev})
       dist += 60
       total = 0
       j = 0
      }
  }
  return chartData
}

export default class EChart extends PureComponent {

  render() {
    
    var arr = this.props.data
    arr = arr.reverse()
    // arr[0] = arr[0].slice(1, arr[0].length);
    // arr[arr.length - 1] = arr[arr.length - 1].slice(0, -1);
    // arr = Array.from(arr)
    let chartData = getAverage(arr);
    //console.log(arr)
    //const chartData = arr.map((x, i) => ({distance : i * 60, elevation: x}));
    //console.log(chartData)

    return (
      <div style={{ width: '500px', backgroundColor: '#343332'}}>
        <h4>Elevation Statistics</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={100}
            data={chartData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'distance'} unit = 'm'/>
            <YAxis/>
            <Tooltip />
            <Area type="monotone" dataKey="elevation" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
