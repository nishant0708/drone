import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEBhBv7AcPhmWS1JwfXijBEarDjsz16xM",
  authDomain: "lupo-7ba5f.firebaseapp.com",
  databaseURL: "https://lupo-7ba5f-default-rtdb.firebaseio.com",
  projectId: "lupo-7ba5f",
  storageBucket: "lupo-7ba5f.appspot.com",
  messagingSenderId: "418172032930",
  appId: "1:418172032930:web:b28842c67139e5c0e6c4fb",
  measurementId: "G-1NVNFSWR1M"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const detectionRef = ref(database, 'objectDetection');
    onValue(detectionRef, (snapshot) => {
      const detections = snapshot.val();
      if (detections) {
        const matchedTimestamps = [];
        for (let key in detections) {
          if (detections[key].objectDetected === 'weed') {
            matchedTimestamps.push(detections[key].timestamp);
          }
        }
        if (matchedTimestamps.length > 0) {
          findLocationsByTimestamps(matchedTimestamps);
        }
      }
    });
  }, []);

  const findLocationsByTimestamps = (timestamps) => {
    const locationRef = ref(database, 'location');
    onValue(locationRef, (snapshot) => {
      const locationsData = snapshot.val();
      if (locationsData) {
        const matchedLocations = [];
        for (let key in locationsData) {
          if (timestamps.includes(locationsData[key].timestamp)) {
            const { latitude, longitude } = locationsData[key];
            matchedLocations.push({ latitude, longitude });
          }
        }
        setLocations(matchedLocations);
      }
    });
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div id="mid-root">
      <div className="overlay"></div>
      <div className="heading_block">
        <h1 className="heading">Agricultural Drone</h1>
        <h3>Weed Detection Map</h3>
        <MapContainer center={[22.7196, 75.8577]} zoom={13} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {locations.length > 0 ? (
            locations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.latitude, loc.longitude]}
                icon={customIcon}
              >
                <Popup>Weed detected here!</Popup>
              </Marker>
            ))
          ) : (
            <p>Loading map or no weed detected...</p> // Ensure this line has no hidden characters or formatting issues
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
