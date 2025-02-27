import { MapMarker } from "expo-leaflet";

export type UbicacionSeleccionadaType = {
    ubicacionSeleccionada: MapMarker[];
    setUbicacionSeleccionada: (value: MapMarker[]) => void;
  };