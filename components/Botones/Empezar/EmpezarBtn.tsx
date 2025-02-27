import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const EmpezarBtn = () => {
    const {setAccionUsuario } = useContext(
        RutappContext
      ) as AccionUsuarioType;
    const empezarReparto = ()=>{
        // if (repartosArr.length > 0 && dataMarkers.length > 0) {
        //     setAccionUsuario('repartiendo');
        //     AsyncStorage.setItem('repartiendo', 'true')
        //   } else {
    
        //     setMensajeSnack({ bool: true, texto: "Debe crear repartos para poder empezar" })
    
        //   }
        setAccionUsuario("repartiendo")
        
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
    style={{ width: "100%", borderRadius: 0 }} 
    onPress={empezarReparto}>Empezar</Button>
  </View>
  )
}

export default EmpezarBtn