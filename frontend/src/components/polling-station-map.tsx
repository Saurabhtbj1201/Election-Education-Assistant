"use client";

import { useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export function PollingStationMap() {
  // New Delhi coordinates
  const [position] = useState({ lat: 28.6139, lng: 77.2090 });
  const [open, setOpen] = useState(false);

  return (
    <div className="map-container" aria-label="Interactive map showing sample polling station" style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden", marginTop: "2rem", border: "1px solid #eaeaea" }}>
      <Map 
        defaultZoom={13} 
        defaultCenter={position} 
        mapId="DEMO_MAP_ID"
        aria-label="Map"
      >
        <AdvancedMarker position={position} onClick={() => setOpen(!open)}>
          <Pin background={"#EA4335"} borderColor={"#B31412"} glyphColor={"#fff"} />
        </AdvancedMarker>
      </Map>
      {open && (
        <div style={{ padding: "1rem", background: "#f8f9fa", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
          <strong>Sample Polling Station</strong>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "#666" }}>
            New Delhi, India
          </p>
        </div>
      )}
    </div>
  );
}