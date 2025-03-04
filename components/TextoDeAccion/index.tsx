import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { ModoContactoType } from '@/context/types/ModoContactoType';
import { RepartosArrType } from '@/context/types/RepartosArrType';
import React, { useContext } from 'react'
import { View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

const TextoDeAccion = () => {
    const {modoContacto } = useContext( RutappContext) as ModoContactoType;
      const {accionUsuario}= useContext(RutappContext) as AccionUsuarioType;
      const {repartosArr} = useContext(RutappContext) as RepartosArrType;
  return (
    <View style={{ 
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center", 
      width: "100%", 
      height: 40,
      backgroundColor: accionUsuario == "repartiendo"?"#bd3831":"#FFFCF0"
     }}>
   <Text style={{ width: "100%", 
    color: accionUsuario == "repartiendo"? "#FFFCF0":"black", 
    textAlign: "center", 
    fontWeight: "bold", 
    letterSpacing:accionUsuario == "repartiendo"?1: 3, 
    justifyContent: "center", 
    textTransform: "uppercase",
    fontSize: accionUsuario == "repartiendo"? 8 : 14 
    }}
    
    > 
    <Icon source={modoContacto ? "account-box" : "truck-fast-outline"} size={15} color={accionUsuario == "repartiendo"?"#FFFCF0" : "black"}></Icon>
    {modoContacto ?
     "contactos" : 
     accionUsuario != "repartiendo" 
     ?"repartos"
     :repartosArr[repartosArr.length - 1].nombre + " - " + repartosArr[repartosArr.length - 1].direccion
     }
    </Text>
  </View>
  )
}

export default TextoDeAccion