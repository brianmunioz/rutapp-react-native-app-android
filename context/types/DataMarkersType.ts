import { MapMarker } from "expo-leaflet";

export type DataMarkersType = {
    dataMarkers: MapMarker[];
    setDataMarkers: (value: MapMarker[]) => void;
  };