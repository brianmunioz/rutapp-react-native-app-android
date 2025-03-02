import {  ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { ExpoLeaflet, MapLayer, MapMarker } from "expo-leaflet";
import RutappContext from "@/context/RutappContext";
import { FollowMyLocationType } from "@/context/types/FollowMyLocationType";
import { ZoomType } from "@/context/types/ZoomType";
import { ActualPosType, MapCenterPosType, OwnPositionType } from "@/context/types/LocationType";
import { AccionUsuarioType } from "@/context/types/AccionUsuarioType";
import { UbicacionSeleccionadaType } from "@/context/types/UbicacionSeleccionadaType";
import IcontactosSQL from "@/interfaces/IContactosSQL";
import { MarkerTelType } from "@/context/types/MarkerTelType";
import { ContactosArrType } from "@/context/types/ContactosArrType";
import { DataMarkersType } from "@/context/types/DataMarkersType";
import { RepartosArrType } from "@/context/types/RepartosArrType";
import { RepartoBoolType } from "@/context/types/RepartoBoolType";

const mapLayer: MapLayer = {
  baseLayerName: "OpenStreetMap",
  baseLayerIsChecked: true,
  layerType: "TileLayer",
  baseLayer: true,
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    "OpenStreetMap contributors",
};
interface ILocation {
  lat: number,
  lng: number
}
export default function MyMap()
{
 let mapCenter:ILocation={ lat: -35.103034508838604, lng: -59.50661499922906 };

const {followMyLocation,
  setFollowMyLocation } = useContext(RutappContext) as FollowMyLocationType;
const {zoom,setZoom } = useContext(RutappContext) as ZoomType;
const {setActualPos } = useContext(RutappContext) as ActualPosType;
const {accionUsuario } = useContext(RutappContext) as AccionUsuarioType;

const {ubicacionSeleccionada,setUbicacionSeleccionada } = useContext(
  RutappContext) as UbicacionSeleccionadaType;

const {contactosArr } = useContext(RutappContext) as ContactosArrType;

const {markerTel,setMarkerTel} = useContext( RutappContext) as MarkerTelType;
const {dataMarkers} = useContext(RutappContext) as DataMarkersType;
const {repartosArr} = useContext(RutappContext) as RepartosArrType;
const {ownPosition} = useContext(RutappContext) as OwnPositionType;
const {repartoBool} = useContext(RutappContext) as RepartoBoolType;
const {mapCenterPos} = useContext(RutappContext) as MapCenterPosType;
const defaultZoom = ownPosition || repartosArr.length > 0 || contactosArr.length > 0 ? 18 : 3;

 const markers: MapMarker[] = [{
    id: "ubicacion",
    position: !ownPosition ? { lat: -38.72707, lng: -62.27592 } : ownPosition,
    icon: '<svg class="map-pin"style="width: 15px;height:15px;border-radius: 50%; padding: 3px; background-color: rgb(255, 132, 132); box-shadow: 0 0 5px rgba(255, 132, 132, 0.9);"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>crosshairs-gps</title><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" /></svg>',
    size: [12, 12],
  }
  ];


  return (

    <ExpoLeaflet
              mapLayers={[mapLayer]}
              mapMarkers={accionUsuario === "crear" ? [...ubicacionSeleccionada, ...dataMarkers] : ownPosition ?
                accionUsuario === 'repartiendo' ?
                  [markers[0], dataMarkers[0]]
                  : [markers[0], ...dataMarkers]
                : accionUsuario === 'repartiendo' && repartosArr.length > 0 ?
                  [dataMarkers[0]]
                  : dataMarkers.length > 0 ? dataMarkers : []}
                  mapCenterPosition={followMyLocation || repartoBool ? mapCenterPos : mapCenterPos}
                  maxZoom={18}
                  zoom={followMyLocation ? zoom : defaultZoom}
              loadingIndicator={() => <ActivityIndicator style={{ height: "100%" }} 
              animating={true} 
              size={"large"} 
              color={"black"} />}
              onMessage={(message) => {
            if(message.tag === 'onMove' && followMyLocation) setFollowMyLocation(false)
            if (message.tag == "onMoveEnd") {
              setZoom(message.zoom)
              setActualPos(message.mapCenter)
            }

            if (message.tag === 'onMapClicked' && (accionUsuario == "crear")) {
              const newMarker: MapMarker = {
                id: "ubicacion-seleccionada",
                position: { lat: message.location.lat, lng: message.location.lng },
                icon: `<svg style="width:30px;height:30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>`,
                size: [15, 15],
              }
              setUbicacionSeleccionada([newMarker]);
            } else if (message.tag == "onMapMarkerClicked" && message.mapMarkerId !== "ubicacion") {
              const idMarker = parseInt(message.mapMarkerId);
              if (idMarker !== markerTel.id) {
                const findMarker: IcontactosSQL[] = contactosArr.filter(e => e.id === idMarker);
                setMarkerTel({ id: idMarker, show: true, tel: findMarker[0]?.telefono || 0 })
              } else {
                setMarkerTel({ id: markerTel.id, show: !markerTel.show, tel: markerTel.tel })

              }

            }
          }}
                      /> 

  );
}

