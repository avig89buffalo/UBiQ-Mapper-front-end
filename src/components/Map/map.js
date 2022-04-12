import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './map.css'
import EChart from '../ElevationChart/eChart'

mapboxgl.accessToken = 'pk.eyJ1IjoidG51amEiLCJhIjoiY2wwY3QwNDc5MDBicjNkazk1MWFxYW9lNCJ9.sN1R_K8_L8yNieXxbgKbRw';


export default function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-78.79785);
    const [lat, setLat] = useState(42.99132);
    const [zoom, setZoom] = useState(15);
    // const [datapoints,setDatapoints] = useState([])
    const [maploaded, setMapLoaded] = useState(false)
    const [mapData, setMapData] = useState([])
    var gradeData = []
    
    const getAverage = (arr) => {
        let total = 0
        gradeData = []
        for(const item of arr){
            total += item[2]
            gradeData.push(item[2])
        }

        return (total/arr.length) 

    }

    useEffect(() => {
        var allData = []
        var b = true
        for (const d of props.dataSet){
            const grade = getAverage(d)
            var feature = {
                'type': 'Feature',
                'properties': {
                    'color': `rgba(${1/(1+ Math.pow(2.718,- grade)) < 0.5 ? 31 : 224},
                        ${1/(1+ Math.pow(2.718,- grade)) < 0.5 ? 224 : 31},
                        ${1/(1+ Math.pow(2.718,- grade)) < 0.5 ? 182 : 73},
                        ${1/(1+ Math.pow(2.718,- grade))})` ,
                    'description': `Avg. elevation: ${grade}`,
                    'value': grade,
                    'gradeData': gradeData
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': d
                }
            }

            allData.push(feature)
        }
        setMapData(allData)
    }, [props.dataSet])

    // for datapoints
    useEffect(() => {

        if (!maploaded) return

        if (map.current.getLayer('paths')) {
            map.current.getSource('paths').setData( {
                "type": "FeatureCollection",
                "features": mapData
            });
            return
        }

        map.current.addSource('paths', {
            type: 'geojson',
            data: {
                "type": "FeatureCollection",
                "features": mapData
            }
        });

        //  map.current.addLayer({
        //     'id': 'paths',
        //     'type': 'circle',
        //     'source': 'paths'
        //     });

        map.current.addLayer({
            'id': 'paths',
            'type': 'line',
            'source': 'paths',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            //'line-color': ['get', 'color'],
            'line-color': ['interpolate', ['linear'], ['get', 'value'], -3, 'red', 0, 'green', 3, 'blue'],
            'line-width': 3
            
            }
            });

            map.current.on('mouseenter', 'paths', e => {
                const coordinates = [e.lngLat.lng, e.lngLat.lat]
                const description = e.features[0].properties.description;
    
                popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
            })
            
            map.current.on('click', 'paths', e => {
                const coordinates = [e.lngLat.lng, e.lngLat.lat]
                const description = e.features[0].properties.description;
                const coordinatesOnLine = e.features[0].properties.gradeData;
                const placeholder = document.createElement('div');
                placeholder.style.backgroundColor = '#343332';
                placeholder.style.width = 500
                ReactDOM.render(<EChart data = {coordinatesOnLine} />, placeholder);
                //console.log("hi")
                // map.bindPopup(div);
                // map.openPopup();
                popup2.setLngLat(coordinates).setDOMContent(placeholder).addTo(map.current);
            })

            map.current.on('mouseleave', 'paths', () => {
                map.current.getCanvas().style.cursor = '';
                popup.remove();
                });

    }, [maploaded, mapData])


    useEffect(() => {
        if(map.current) return;
        // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom,
            autoLegend:true,
            attributionControl: false
        });
        map.current.on('load', () => {
            setMapLoaded(true)
        });
    },[])


    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });

        const popup2 = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
            });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });


    },[]);


    return (
        <div id="mapbox">
            <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div id="colorMeter">
                <div id="red">
                    <p>Uphill</p> 
                    <p>Flat</p> 
                    <p>Downhill</p> 

                </div>
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}