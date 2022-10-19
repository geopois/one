import * as React from "react";
import mapboxgl from "mapbox-gl";

// import the mapbox-gl styles so that the map is displayed correctly
import "mapbox-gl/dist/mapbox-gl.css"; 

function MapboxMap() {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = React.useState<mapboxgl.Map>();

    // React ref to store a reference to the DOM node that will be used
    // as a required parameter `container` when initializing the mapbox-gl
    // will contain `null` by default
    const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [-3.697457215656853, 40.348295056838715],
      zoom: 17,
      minZoom: 16,
    });

    // save the map object to React.useState
    setMap(mapboxMap);

        return () => {
      mapboxMap.remove();
    };
  }, []);

    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap