import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { EditarType } from '@/context/types/EditarType';
import { MarkerTelType } from '@/context/types/MarkerTelType';
import { ModalVisibleType } from '@/context/types/ModalVisibleType';
import { ModoContactoType } from '@/context/types/ModoContactoType';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';

const AgregarBtn = () => {
  const {setMarkerTel} = useContext(RutappContext) as MarkerTelType;
  const {setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
  const {setEditar} = useContext(RutappContext) as EditarType;
  const {modoContacto} = useContext(RutappContext) as ModoContactoType;
  const {setModalVisible} = useContext(RutappContext) as ModalVisibleType;
    const agregar = ()=>{
        setMarkerTel({ id: 0, show: false, tel: 0 })
        setAccionUsuario('crear');
        if (!modoContacto) setModalVisible(true)
        setEditar(false)

    }
  return (
        <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >
    
    <Button 
    textColor="black" 
    contentStyle={{ height: 50 }} 
    style={{ 
        flex: 1, 
        backgroundColor: "#FFFCF0", 
        height: 50, 
        borderRadius: 0, 
      
        justifyContent: "center" 

    }} 
    
    mode="contained-tonal" 
    onPress={agregar}
      >
        <Icon size={18} color='#FF6961' source={"map-marker-plus-outline"}></Icon>       
    </Button>
    <Text style={{backgroundColor: "#FFFCF0",paddingVertical: 2 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>agregar</Text>
    
    </View>
      )
}

export default AgregarBtn