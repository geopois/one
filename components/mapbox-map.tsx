import * as React from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css"; 
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


function MapboxMap() {
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const mapNode = React.useRef(null);
  

  React.useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [-3.697457215656853, 40.348295056838715],
      zoom: 17,
      minZoom: 16,
      maxBounds: [[-3.8382521729390406, 40.31206732887142],[-3.5181700059205485, 40.58359405482841]]
    });

    mapboxMap.addControl(
      new MapboxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
        countries: 'es',
        bbox: [-3.8382521729390406, 40.31206732887142, -3.5181700059205485, 40.58359405482841],
        flyTo: {
          speed: 100 // Make the flying slow.
        },
        zoom: 18,
        mapboxgl: mapboxgl
      }), 'top-left',
    );

    setMap(mapboxMap);
    
    return () => {
      mapboxMap.remove();
    };
  }, []);
    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap