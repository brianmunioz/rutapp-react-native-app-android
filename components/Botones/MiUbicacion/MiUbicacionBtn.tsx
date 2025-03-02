import React, { useContext, useEffect } from 'react'
import { Button, Icon, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import RutappContext from '@/context/RutappContext';
import { ActualPosType, MapCenterPosType, OwnPositionType } from '@/context/types/LocationType';
import { FollowMyLocationType } from '@/context/types/FollowMyLocationType';
import { ZoomType } from '@/context/types/ZoomType';
import { MarkerTelType } from '@/context/types/MarkerTelType';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { BoolLocationType } from '@/context/types/BoolLocationType';
import { View } from 'react-native';
import { useGetMyLocation } from '@/hooks/getMyLocation';


const MiUbicacionBtn = () => {
    const {ownPosition,setOwnPosition} = useContext(RutappContext) as OwnPositionType;
    const {setMapCenterPos} = useContext(RutappContext) as MapCenterPosType;
    const {followMyLocation,setFollowMyLocation} = useContext(RutappContext) as FollowMyLocationType;
    const {setZoom} = useContext(RutappContext) as ZoomType;
    const {actualPos} = useContext(RutappContext) as ActualPosType;
    const {setMarkerTel} = useContext(RutappContext) as MarkerTelType;
    const {accionUsuario,setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
    const {setBoolLocation} = useContext(RutappContext)  as BoolLocationType;

    const getSingleLocationAsync = useGetMyLocation();
     const getLocationAsync = async () => {
      const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // Tiempo entre actualizaciones en milisegundos
        distanceInterval: 1, // Distancia mínima en metros para una nueva actualización
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        setOwnPosition({
          lat: latitude,
          lng: longitude,
        });
        
    
      })
      }
      useEffect(()=>{
        if(!ownPosition || ownPosition == null) {
          
          getSingleLocationAsync().then(e=>
          {
            if(e != null){
              setOwnPosition(e);
              setMapCenterPos(e);
              setFollowMyLocation(true)
            }
    
          }
    
          );
        };
    
        if(followMyLocation != false && ownPosition) {
          
          setMapCenterPos({
            lat: ownPosition.lat,
            lng: ownPosition.lng,
          });
         
          setZoom(17)
        }
      },[followMyLocation])
    const miUbicacion = ()=>{
      getSingleLocationAsync().then(async e=>
        {
          if(e != null){
            setOwnPosition(e);
            setMapCenterPos(e);
            setFollowMyLocation(true);
            
          }
  
        }
  
        );
        if (ownPosition) {
            setFollowMyLocation(true)
            setMapCenterPos(actualPos);
            setMarkerTel({ id: 0, show: false, tel: 0 })
            setZoom(17);
            if (accionUsuario != 'repartiendo') setAccionUsuario(null);
            setBoolLocation(true);
            
          }
    }
  return (
    <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >
    
    <Button 
    contentStyle={{ height: "100%" }} 
    buttonColor="#FFFCF0" 
    style={{ flex: 1, borderRadius: 0 }} 
    mode="contained-tonal" 
    onPress={miUbicacion} >
        <Icon 
        size={18}
         source={"crosshairs-gps"}
          color="rgb(133, 37, 37)" />
    </Button>
    <Text style={{backgroundColor: "#FFFCF0",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>mi ubicación</Text>

    </View>
    )
}

export default MiUbicacionBtn