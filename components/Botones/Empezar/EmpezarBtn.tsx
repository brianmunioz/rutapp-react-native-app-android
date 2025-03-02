import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { DataMarkersType } from '@/context/types/DataMarkersType';
import { MensajeSnackType } from '@/context/types/MensajeSnack';
import { RepartosArrType } from '@/context/types/RepartosArrType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const EmpezarBtn = () => {
    const {setAccionUsuario } = useContext(
        RutappContext
      ) as AccionUsuarioType;
      const {repartosArr} = useContext(RutappContext) as RepartosArrType;
      const {dataMarkers} = useContext(RutappContext) as DataMarkersType;
      const {setMensajeSnack} = useContext(RutappContext) as MensajeSnackType;
    const empezarReparto = ()=>{
        if (repartosArr.length > 0 && dataMarkers.length > 0) {
            setAccionUsuario('repartiendo');
            AsyncStorage.setItem('repartiendo', 'true');
            setAccionUsuario("repartiendo")

          } else {
    
            setMensajeSnack({ bool: true, texto: "Debe crear repartos para poder empezar" })
    
          }
        
    }
  return (
    <View style={{ 
        position: "absolute",
        bottom: 0, 
        flexDirection: "row", 
        justifyContent: "center", 
        height: 50 
    }}>
    <Button
    mode="contained" 
    contentStyle={{ height: "100%" }} 
    textColor='black'
    style={{ width: "100%", borderRadius: 0, backgroundColor: "#FFFCF0",borderWidth: 1, borderColor: "black" }} 
    onPress={empezarReparto}>Empezar</Button>
  </View>
  )
}

export default EmpezarBtn