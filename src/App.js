import './App.css';
import Map from './components/Map/map'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import road1 from "../src/cleaned/maple_ver_7_14_trip.csv.json"
import road2 from "../src/cleaned/sweet_ver_7_14_trip.csv.json"
import road3 from "../src/cleaned/grade_6136_ver_7_14_trip.csv.json"
import road4 from "../src/cleaned/grade_8855_ver_7_14_trip.csv.json"
import segs from "../src/cleaned/segs.json"

class App extends React.Component {
  constructor(props) {
      super(props);
      //fetching data from json files until backend APIs are ready
      // var r1 = JSON.parse(road1);
      // var r2 = JSON.parse(road2);
      // var r3 = JSON.parse(road3);
      // var r4 = JSON.parse(road4);
      // var s = segs;
      // var data = []
      // data.push(r1)
      // data.push(r2)
      // data.push(r3)
      // data.push(r4)
      this.state = {
        dataSet: []
    };
  }

async componentDidMount() {

  //Bounding box for Buffalo
  const body = { "lat1": 42.88402366, "lat2": 43.0139436, "long1": -78.8246377, "long2": -78.72325793 };

  const response = await axios.post('http://127.0.0.1:5001/segmentElevation/getSegmentElevationsForBoundingBox', body, {
    headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    }
  });
  // console.log(response.data);
// console.log(response.data)
const temp = []
temp.push(response.data)
  this.setState({ dataSet: temp });
}

render(){
  const { dataSet } = this.state;
  return (
    <div className="container">
    <header>
      <h2>Phone Mapper</h2>
    </header>

    <div className="main">
      <div className="row">
      <Map  className="map" dataSet={dataSet}/>
      </div>
    </div>


    </div>
  );
}
}

export default App;
