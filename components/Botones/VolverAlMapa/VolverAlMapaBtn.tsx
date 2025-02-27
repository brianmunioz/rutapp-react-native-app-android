import RutappContext from '@/context/RutappContext'
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType'
import { EditarType } from '@/context/types/EditarType'
import {  MarkerTelType } from '@/context/types/MarkerTelType'
import { ModalVisibleType } from '@/context/types/ModalVisibleType'
import { RepartoConContactoType } from '@/context/types/RepartoConContactoType'
import { UbicacionSeleccionadaType } from '@/context/types/UbicacionSeleccionadaType'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

const VolverAlMapaBtn = () => {
  const {setEditar} = useContext(RutappContext)as EditarType;
  const {setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
  const {setMarkerTel} = useContext(RutappContext) as MarkerTelType;
  const {setModalVisible} = useContext(RutappContext) as ModalVisibleType;
  const {setRepartoConContacto} = useContext(RutappContext) as RepartoConContactoType;
  const {setUbicacionSeleccionada} = useContext(RutappContext) as UbicacionSeleccionadaType;
    const volver = ()=>{
         setEditar(false);
             setAccionUsuario(null);
             setMarkerTel({ id: 0, show: false, tel: 0 })
             setModalVisible(false)
             setRepartoConContacto(null)
             setUbicacionSeleccionada([]);
    }
  return (
        <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >
    
<Button onPress={volver} 
          contentStyle={{ height: "100%" }} 
          buttonColor="#FFFCF0" 
          style={{ flex: 1, borderRadius: 0 }} 
          mode="contained-tonal" >
            <Icon size={18} source={"earth-box"} color="black" />
          </Button>
          <Text style={{backgroundColor: "#FFFCF0",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>Ir al mapa</Text>

          </View>
            )
}

export default VolverAlMapaBtn