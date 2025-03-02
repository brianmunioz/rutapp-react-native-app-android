import RutappContext from '@/context/RutappContext'
import { MarkerTelType } from '@/context/types/MarkerTelType'
import { MensajeSnackType } from '@/context/types/MensajeSnack'
import React, { useContext } from 'react'
import { Linking, View } from 'react-native'
import { Button } from 'react-native-paper'

const ContactosBtn = () => {
    const {markerTel} = useContext(RutappContext) as MarkerTelType;
    const {setMensajeSnack} = useContext(RutappContext) as MensajeSnackType;
  return (
    <View 
    style={{ position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "center", height: 50 }}>
    <Button 
    mode="contained" 
    textColor='black'
    contentStyle={{ height: "100%", 
        borderWidth: 1, 
        borderColor: "#000" 
    }} 
    style={{ width: "50%", borderRadius: 0, 
        backgroundColor: !markerTel.show ? "#FFFCF0" : "#c4edbd"  
    }} 
    icon={"whatsapp"} onPress={() => 
        {
             markerTel.show && markerTel.tel !== 0 ?
              Linking.openURL(`http://api.whatsapp.com/send?phone=${markerTel.tel}`)
             : setMensajeSnack({bool:true,texto:"Para enviar un whatsapp debes tocar un pin"});
}        }
    >
         {markerTel.tel === 0 && markerTel.show ? "WHATSAPP (no tiene)" : "WHATSAPP"}
        </Button>
    <Button 
    mode="contained" 
    
    contentStyle={{ height: "100%" }} 
    textColor='black'
    style={{ width: "50%", 
       
    borderRadius: 0, 
    backgroundColor:   !markerTel.show ? "#FFFCF0" : "#e6eff7" ,
    borderWidth: 1, 
    borderColor: "#000" 
    }} 
    icon="phone" 
    onPress={() => {
        markerTel.show ? markerTel.tel !== 0 && Linking.openURL(`tel:+${markerTel.tel}`)
        : setMensajeSnack({bool:true,texto:"Para llamar debes tocar un pin"});
        }
        }>
        {markerTel.tel === 0 && markerTel.show ? "LLAMAR (no tiene número)" : "LLAMAR"}
        </Button>
  </View>
  )
}

export default ContactosBtn