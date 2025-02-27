import RutappContext from '@/context/RutappContext'
import { ModoContactoType } from '@/context/types/ModoContactoType';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper'


const CambiarModoBtn = () => {
    const {modoContacto, setModoContacto } = useContext(
        RutappContext
      ) as ModoContactoType;
    
    const cambiarDeModo = ()=>{
        setModoContacto(!modoContacto);
    }
  return (
    <View style={{flex:1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >

<Button contentStyle={{ height: "100%"}} buttonColor="#FFFCF0"
style={{ flex: 1, borderRadius: 0  }} 
onPress={() => cambiarDeModo()} 
mode="contained-tonal" >
  <Icon size={18} source={"sync"} color="black" />

</Button>
<Text style={{backgroundColor: "#FFFCF0",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>Cambiar Modo</Text>

</View>
  )
}

export default CambiarModoBtn