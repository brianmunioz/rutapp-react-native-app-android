import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { MensajeSnackType } from '@/context/types/MensajeSnack';
import { ModalVisibleType } from '@/context/types/ModalVisibleType';
import { RepartoConContactoType } from '@/context/types/RepartoConContactoType';
import { UbicacionSeleccionadaType } from '@/context/types/UbicacionSeleccionadaType';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const CrearBtn = () => {
  const {ubicacionSeleccionada} = useContext(RutappContext) as UbicacionSeleccionadaType;
  const { setRepartoConContacto} = useContext(RutappContext) as RepartoConContactoType;
  const {setModalVisible} = useContext(RutappContext) as ModalVisibleType
    const {setMensajeSnack} = useContext(RutappContext) as MensajeSnackType;
    const {accionUsuario, setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
    const cancelar = ()=>{
        // if (modoContacto) {
        //     resetTodo();
        //     setEditar(false);
        //   }
        //   if (!modoContacto && accionUsuario === "crear") {
        //     setRepartoConContacto(null);
        //     setModalVisible(true);
        //   }
        setAccionUsuario(null)
    }
    const listo = ()=>{
        if (ubicacionSeleccionada.length > 0) {
            setRepartoConContacto(false)
            setModalVisible(true);
          } else {
            setMensajeSnack({ bool: true, texto: "Debe seleccionar ubicación para poder seguir" })
          }
        
    }
  return (
    <View style={{ position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "center", height: 50 }}>
    <Button 
    mode="elevated" 
    contentStyle={{ height: "100%" }} 
    style={{ width: "50%", borderRadius: 0 }} 
    textColor="#C5705D" 
    onPress={cancelar}>cancelar</Button>
    <Button mode="contained" 
    contentStyle={{ height: "100%" }} 
    style={{
        backgroundColor:  "#386b38" , //condicional
        width: "50%", 
        borderRadius: 0 
    }} 
    onPress={listo}>LISTO</Button>
  </View>
  )
}

export default CrearBtn