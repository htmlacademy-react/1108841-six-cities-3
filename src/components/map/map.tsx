import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/state';
import { RootState } from '../../store';

type MapProps = {
  offers: Offer[];
  lat: number;
  lng: number;
  zoom: number;
};

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export function Map({ offers, lat, lng, zoom }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const activeOfferId = useSelector((state: RootState) => state.activeOfferId);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([lat, lng], zoom);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
        { icon: offer.id === activeOfferId ? activeIcon : defaultIcon }
      ).addTo(mapRef.current!);

      marker.bindPopup(offer.title);
      markersRef.current.push(marker);
    });
  }, [offers, activeOfferId]);

  return <section className="cities__map map" id="map" />;
}
