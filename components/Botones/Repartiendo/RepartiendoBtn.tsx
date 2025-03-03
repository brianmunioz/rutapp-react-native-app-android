import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { DataMarkersType } from '@/context/types/DataMarkersType';
import { MapCenterPosType } from '@/context/types/LocationType';
import { MensajeSnackType } from '@/context/types/MensajeSnack';
import { RepartosArrType } from '@/context/types/RepartosArrType';
import { usePedirRepartos } from '@/hooks/pedirRepartos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const RepartiendoBtn = () => {
    const { accionUsuario, setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
    const {dataMarkers,setDataMarkers} = useContext(RutappContext) as DataMarkersType;
    const {repartosArr,setRepartosArr} = useContext(RutappContext) as RepartosArrType;
    const {setMapCenterPos} = useContext(RutappContext) as MapCenterPosType;
    const {setMensajeSnack} = useContext(RutappContext) as MensajeSnackType;
    const db = useSQLiteContext();
    const pedirRepartos = usePedirRepartos();
    
    

    const detener = ()=>{
        salirDelReparto();
        setAccionUsuario(null);
    }
    const postergar = ()=>{
      if(repartosArr.length >1 ){
  let arreglo = [...dataMarkers];
        if(arreglo.length > 1) {
          setMapCenterPos({lat: arreglo[1].position.lat,lng: arreglo[1].position.lng});
        }
        arreglo.push(arreglo.splice(0, 1)[0]);
        async function reordenarArreglo() {
          const idsAsync = await AsyncStorage.getItem('ordenrepartos');
          let ids: number[] = idsAsync && idsAsync !== null ? JSON.parse(idsAsync) : [];
          ids.push(ids.splice(0, 1)[0]);
          await AsyncStorage.setItem('ordenrepartos', JSON.stringify(ids))
          pedirRepartos()
  
        }
        reordenarArreglo()
        setDataMarkers(arreglo)
      }else{
        setMensajeSnack({bool: true, texto: "No puede postergar este envío ya que es el único que le queda por terminar"})
      }
      
    }
    const avanzar = ()=>{
        async function avanzarReparto() {   
          if(repartosArr.length > 1) {
            setMapCenterPos({lat: repartosArr[1].lat,lng: repartosArr[1].lng});
          }   
            await db.runAsync('UPDATE repartos SET finalizado = 1 WHERE id = ?', repartosArr[0].id);
            const idsAsync = await AsyncStorage.getItem('ordenrepartos');
            let ids: number[] = idsAsync && idsAsync !== null ? JSON.parse(idsAsync) : [];
            const nuevosIds = repartosArr.length > 1 ? ids.filter(e => e != repartosArr[0].id):[]; 
            await AsyncStorage.setItem('ordenrepartos', JSON.stringify(nuevosIds));
          }
          avanzarReparto();
          pedirRepartos();    
          if (repartosArr.length <=1) {
            setMensajeSnack({bool:true,texto: "¡Finalizaste todo tu recorrido!"});

            setRepartosArr([]);
            salirDelReparto();
            setAccionUsuario(null)
          }
          
    }
  return (
    <View style={{ position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "center", height: 50 }}>
    <Button 
    mode="contained" 
    icon="motion-pause" 
    contentStyle={{ height: "100%" }} 
    style={{ width: "33.3%", borderRadius: 0,
      borderWidth: 1,
      borderColor: "black"

     }} 
     labelStyle={{ fontSize: 13 }}
    buttonColor="#f9706b" 
    textColor="black" 
    onPress={detener}>DETENER</Button>
    
    <Button 
    mode="elevated" 
    icon={'page-next-outline'} 
    contentStyle={{ height: "100%" }} 
    labelStyle={{ fontSize: 13 }}
    textColor={repartosArr.length >1 ?'black':"grey"}
    style={{ width: "33.3%", 
      borderRadius: 0,      
      borderWidth: 1,
      borderColor: "black"
     }} 
    onPress={postergar}>POSTERGAR</Button>
    <Button 
    mode="contained" 
    icon={accionUsuario ?"map-marker-check" :"chevron-right"}
    contentStyle={{ height: "100%" }} 
    style={{ width: "33.3%", borderRadius: 0,
            borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#6bd39a"
     }}
     textColor='black'

     labelStyle={{ fontSize: 13 }}
     onPress={avanzar}
    
    >{repartosArr.length > 1 ? "AVANZAR":"FINALIZAR"}</Button>
  </View>
  )
}

export default RepartiendoBtn

async function salirDelReparto(){
  await AsyncStorage.setItem('repartiendo', 'false');

 }
