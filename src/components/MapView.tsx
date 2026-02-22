import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  emoji: string;
  meals?: number;
}

interface MapViewProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const MapView = ({ markers, center = [17.385, 78.4867], zoom = 13, className = "" }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markers.forEach((marker) => {
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="font-size:24px;background:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.2);">${marker.emoji}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker([marker.lat, marker.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;padding:4px;">
            <strong>${marker.name}</strong><br/>
            <span style="color:#666;font-size:12px;">${marker.type}</span>
            ${marker.meals ? `<br/><span style="color:#0f9960;font-size:12px;font-weight:600;">${marker.meals} meals rescued</span>` : ""}
          </div>`
        );
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [markers, center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`rounded-2xl overflow-hidden border border-border ${className}`}
      style={{ height: "400px", width: "100%" }}
    />
  );
};

export default MapView;
