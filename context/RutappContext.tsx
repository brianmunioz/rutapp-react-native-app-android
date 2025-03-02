import { createContext, ReactNode, useState } from "react";
import { Mensaje } from "./types/MensajeType";
import IcontactosSQL from "@/interfaces/IContactosSQL";
import { MapMarker } from "expo-leaflet";
import IRepartosSQL from "@/interfaces/IRepartosSQL";
import { LocationCoordenadas } from "./types/LocationType";

const RutappContext = createContext({});

interface Props {
  children: ReactNode;
}

export function RutappContextProvider({ children }: Props) {
  
  const [mensaje, setMensaje] = useState<Mensaje>({mensaje: "",tag: ""});
  const [boolLocation, setBoolLocation] = useState<boolean>(false);
  const [ownPosition, setOwnPosition] = useState<null | Location>(null);  
  const [zoom, setZoom] = useState<number>(3);
  const [accionUsuario, setAccionUsuario] = useState<string | null>(null)
  const [editar, setEditar] = useState<boolean>(false);
  const [mensajeSnack, setMensajeSnack] = useState({ bool: false, texto: "" });
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<MapMarker[]>([]);
  const [modoContacto, setModoContacto] = useState<boolean>(true);
  const [followMyLocation,setFollowMyLocation] = useState<boolean>(true);
  const [repartoConContacto, setRepartoConContacto] = useState<boolean | null>(null);
  const [repartosArr, setRepartosArr] = useState<IRepartosSQL[]>([])
  const [contactosArr, setContactosArr] = useState<IcontactosSQL[]>([])
  const [dataMarkers, setDataMarkers] = useState<MapMarker[]>([])
  const [markerTel, setMarkerTel] = useState({ id: 0, show: false, tel: 0 })
  const [modalVisible, setModalVisible] = useState(false);
  const [repartoBool, setRepartoBool] = useState(false);

    const [mapCenterPos, setMapCenterPos] = useState<LocationCoordenadas>( { lat: -35.103034508838604, lng: -59.50661499922906 });
    const [actualPos, setActualPos] = useState<LocationCoordenadas>( { lat: -35.103034508838604, lng: -59.50661499922906 });
  

    return (
    <RutappContext.Provider value={{  
      mensaje, setMensaje,
      ownPosition, setOwnPosition,
      modoContacto, setModoContacto,
      accionUsuario, setAccionUsuario,
      ubicacionSeleccionada, setUbicacionSeleccionada,
      mensajeSnack, setMensajeSnack,
      editar, setEditar,
      zoom, setZoom,
      boolLocation, setBoolLocation,
      followMyLocation,setFollowMyLocation,
      repartoConContacto, setRepartoConContacto,
      repartosArr, setRepartosArr,
      contactosArr, setContactosArr,
      dataMarkers, setDataMarkers,
      markerTel, setMarkerTel,
      modalVisible, setModalVisible,
      repartoBool, setRepartoBool,
      mapCenterPos, setMapCenterPos,
      actualPos, setActualPos
      }}>
      {children}
    </RutappContext.Provider>
  );
}

export default RutappContext;