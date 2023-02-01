import React, { useRef, useEffect, useState, Component } from "react";
import "./style.css";
import geoJson from "../chigago.json";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmF5ZW5iZCIsImEiOiJja3J1ZmZsYXIzdDAxMm9wZTdna2RxbmIwIn0.kqjiFe-ZOMlb97bJ0mBStw";

const Mapbox = ({ cordslng,cordslat }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(14);
  const [coords, setcoords] = useState([lng, lat]);
  const count = useRef(0);
  const latref = useRef(0);
  const lngref = useRef(0);
  const lngref2 = useRef(0);
  const lngref3= useRef(0);
  const lngref4 =useRef(0);
  const latref2 = useRef(0);
  const latref3 = useRef(0);
  const latref4 =useRef(0);

  // const [];
  let currentMarkers = [];

  useEffect(() => {
    


  }, [cordslng,cordslat]);
  

  useEffect(() => {
   
    latref.current=cordslat[0];
    lngref2.current=cordslng[1];
    lngref3.current=cordslng[2];
    lngref4.current=cordslng[3];
    lngref.current=cordslng[0];
    latref2.current=cordslat[1];
    latref3.current=cordslat[2];
    latref4.current=cordslat[3];
    
    
    navigator.geolocation.getCurrentPosition(sucessLocation, errorLocation, {
      enableHighAccuracy: true,
    });
    function errorLocation() {}
    function sucessLocation(position) {
      var x = position.coords.latitude;
      var y = position.coords.longitude;
      setcoords([y, x]);
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [y, x],
        zoom: zoom,
      });

      // Create default markers
      /*  geoJson.features.map((feature) =>
        new mapboxgl.Marker()
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 30 }).setHTML(
              "<h4>" +
                feature.properties.title +
                "</h4>" +
                feature.properties.description
            )
          )
          .addTo(map)
      );*/
      const distance = React.forwardRef((props, ref) => {
        return <div ref={ref}>Child1</div>;
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
      let geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Saissisez une adresse", // Placeholder text for the search bar
        marker: {
          color: "orange",
        },
        mapboxgl: mapboxgl,
      });
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true,
        })
      );

      map.addControl(geocoder);
      function mysplit(m) {
        let z = m.split(",");
        let x = z[0].replace('{"lng":', "");
        let g = z[1].replace('"lat":', "");
        let y = g.replace("}", "");
        addMarker(x, y);
      }
      function addMarker(x, y) {
        // tmp marker
        let oneMarker = new mapboxgl.Marker().setLngLat([x, y]).addTo(map);
        currentMarkers.push(oneMarker);
      }
      const geojson = {
        type: "FeatureCollection",
        features: [],
      };
      //const distanceContainer = document.getElementById("distance");

      const linestring = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      };
      map.on("load", function (e) {
        map.addSource("geojson", {
          type: "geojson",
          data: geojson,
        });

        // Add styles to the map
        map.addLayer({
          id: "measure-points",
          type: "circle",
          source: "geojson",
          paint: {
            "circle-radius": 5,
            "circle-color": "#000",
          },
          filter: ["in", "$type", "Point"],
        });
        map.addLayer({
          id: "measure-lines",
          type: "line",
          source: "geojson",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#000",
            "line-width": 2.5,
          },
          filter: ["in", "$type", "LineString"],
        });
      });
      if (lngref.current != undefined){
        console.log(lngref.current);

      new mapboxgl.Marker({
        color: "blue",
      })
        .setLngLat([lngref2.current, latref2.current])
    .addTo(map);
    new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([lngref3.current, latref3.current])
  .addTo(map);
  new mapboxgl.Marker({
    color: "green",
  })
    .setLngLat([lngref4.current, latref4.current])
.addTo(map);
new mapboxgl.Marker({
  color: "black",
})
  .setLngLat([lngref.current, latref.current])
.addTo(map);
  }

      map.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });

        // Remove the linestring from the group
        // so we can redraw it based on the points collection.
        if (geojson.features.length > 1) geojson.features.pop();

        // Clear the distance container to populate it with a new value.

        // If a feature was clicked, remove it from the map.
        if (features.length) {
          const id = features[0].properties.id;
          geojson.features = geojson.features.filter(
            (point) => point.properties.id !== id
          );
        } else {
          const point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
            properties: {
              id: String(new Date().getTime()),
            },
          };

          geojson.features.push(point);
        }

        if (geojson.features.length > 1) {
          linestring.geometry.coordinates = geojson.features.map(
            (point) => point.geometry.coordinates
          );

          geojson.features.push(linestring);

          // Populate the distanceContainer with total distance
          const value = document.createElement("pre");
          const distance = turf.length(linestring);
          value.textContent = `Total distance: ${distance.toLocaleString()}km`;
          //distanceContainer.appendChild(value);
          console.log(value, "value");
        }

        map.getSource("geojson").setData(geojson);
      });
      map.on("mousemove", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });
        // Change the cursor to a pointer when hovering over a point on the map.
        // Otherwise cursor is a crosshair.
        map.getCanvas().style.cursor = features.length
          ? "pointer"
          : "crosshair";
      });

      map.on("click", function (e) {
        /*new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);*/
      });
      map.on("click", function (e) {
        count.current++;
        let m = JSON.stringify(e.lngLat.wrap());
        console.log(count.current);

        if (count.current == 1) {
          new mapboxgl.Marker({
            color: "#0096FF",
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          localStorage.setItem("pt1lng", [e.lngLat.lng]);
          localStorage.setItem("pt1lat", [e.lngLat.lat]);
        }
        if (count.current == 2) {
          new mapboxgl.Marker({
            color: "#FF0000",
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          localStorage.setItem("pt2lng", [e.lngLat.lng]);
          localStorage.setItem("pt2lat", [e.lngLat.lat]);
          console.log(
            "AB",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng")
            )
          );
          localStorage.setItem(
            "AB",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng")
            )
          );
        }
        if (count.current == 3) {
          new mapboxgl.Marker({
            color: "#008000",
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          localStorage.setItem("pt3lng", [e.lngLat.lng]);
          localStorage.setItem("pt3lat", [e.lngLat.lat]);
          console.log(
            "AC",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng")
            )
          );
          localStorage.setItem(
            "AC",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng")
            )
          );
        }
        if (count.current == 4) {
          new mapboxgl.Marker({
            color: "#000000",
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          localStorage.setItem("pt4lng", [e.lngLat.lng]);
          localStorage.setItem("pt4lat", [e.lngLat.lat]);
          console.log(
            "AD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
          localStorage.setItem(
            "AD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt1lat"),
              localStorage.getItem("pt1lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
          console.log(
            "BD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
          localStorage.setItem(
            "BD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
          console.log(
            "BC",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng"),
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng")
            )
          );
          localStorage.setItem(
            "BC",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt2lat"),
              localStorage.getItem("pt2lng"),
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng")
            )
          );
          console.log(
            "CD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
          localStorage.setItem(
            "CD",
            getDistanceFromLatLonInKm(
              localStorage.getItem("pt3lat"),
              localStorage.getItem("pt3lng"),
              localStorage.getItem("pt4lat"),
              localStorage.getItem("pt4lng")
            )
          );
        }

        let z = m.split(",");
        let x = z[0].replace('{"lng":', "");
        let g = z[1].replace('"lat":', "");
        let y = g.replace("}", "");
      });
    }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    // Clean up on unmount
  }, [cordslng,cordslat]);
  //split the JSON.stringify(e.lngLat.wrap()) to get the coordinates

  //Add a marker on click after the excution of mysplit() function

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Mapbox;
