import './App.css';
import Map from './components/Map/map'
import React, { useState, useEffect } from 'react';s
import road1 from "../src/cleaned/maple_ver_7_14_trip.csv.json"
import road2 from "../src/cleaned/sweet_ver_7_14_trip.csv.json"
import road3 from "../src/cleaned/grade_6136_ver_7_14_trip.csv.json"
import road4 from "../src/cleaned/grade_8855_ver_7_14_trip.csv.json"


function App() {

  var r1 = JSON.parse(road1);
  var r2 = JSON.parse(road2);
  var r3 = JSON.parse(road3);
  var r4 = JSON.parse(road4);
  var data = r1.concat(r2);
  data = data.concat(r3);
  data = data.concat(r4);
  console.log(data)
  const [dataSet, setDataSet] = useState(data)

  return (
    <div className="container">
    <header>
      <h2>Phone Mapper</h2>
      {/* <h2>Trip: {dataSets[indexer].name}</h2> */}
    </header>

    <div className="main">
      <div className="row">
      <Map  className="map" dataSet={dataSet}/>
      </div>
      {/* <div className="row">
      <Chart  dataSet={dataSet}/>
      </div> */}
    </div>


    </div>
  );
}

export default App;
