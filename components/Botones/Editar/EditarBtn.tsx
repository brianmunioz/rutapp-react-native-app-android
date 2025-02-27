import RutappContext from '@/context/RutappContext'
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType'
import { EditarType } from '@/context/types/EditarType'
import { MarkerTelType } from '@/context/types/MarkerTelType'
import { ModoContactoType } from '@/context/types/ModoContactoType'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

const EditarBtn = () => {
  const {modoContacto} = useContext(RutappContext) as ModoContactoType;
  const {setMarkerTel} = useContext(RutappContext) as MarkerTelType;
  const {setEditar} = useContext(RutappContext) as EditarType;
  const {setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;

    const editar = ()=>{
          if (modoContacto) {
           setMarkerTel({ id: 0, show: false, tel: 0 })
           setEditar(true)
           setAccionUsuario('editar');
         }else{
           setEditar(true)
           setAccionUsuario('editar');
         }
    }
  return (
        <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >
    
    <Button 
    contentStyle={{ height: "100%" }} 
    buttonColor="#FFFCF0" 
    style={{ flex: 1, borderRadius: 0 }} 
    mode="contained-tonal" 
    
    onPress={editar}>

        <Icon 
        size={18}
        
        source={"playlist-edit"}
         color="black" />
    </Button>  
    <Text style={{backgroundColor: "#FFFCF0",paddingVertical: 2 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>editar</Text>

    </View>
    )
}

export default EditarBtn