import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/state';

type MapProps = {
  offers: Offer[];
  lat: number;
  lng: number;
  zoom: number;
  activeOfferId: string | null;
  className?: string;
};

const DEFAULT_ICON = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const ACTIVE_ICON = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function Map({ offers, lat, lng, zoom, activeOfferId, className = '' }: MapProps): JSX.Element {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([lat, lng], zoom);
      L.tileLayer(TILE_LAYER, {
        attribution: ATTRIBUTION,
      }).addTo(mapRef.current);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom);
    }
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    offers.forEach((offer) => {
      const marker = L.marker(
        [offer.location.latitude, offer.location.longitude],
        { icon: offer.id === activeOfferId ? ACTIVE_ICON : DEFAULT_ICON }
      ).addTo(mapRef.current!);

      marker.bindPopup(offer.title);
      markersRef.current.push(marker);
    });
  }, [offers, activeOfferId]);

  return <section className={`cities__map map ${className}`.trim()} id="map" />;
}

export default Map;
