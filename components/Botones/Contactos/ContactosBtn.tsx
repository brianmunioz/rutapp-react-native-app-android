import RutappContext from '@/context/RutappContext'
import { MarkerTelType } from '@/context/types/MarkerTelType'
import React, { useContext } from 'react'
import { Linking, View } from 'react-native'
import { Button } from 'react-native-paper'

const ContactosBtn = () => {
    const {markerTel} = useContext(RutappContext) as MarkerTelType;
  return (
    <View 
    style={{ position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "center", height: 50 }}>
    <Button 
    mode="contained" 
    disabled={!markerTel.show} 
    contentStyle={{ height: "100%", borderRightWidth: 1, borderRightColor: "#C0C0C0" }} 
    style={{ width: "50%", borderRadius: 0, 
        backgroundColor: !markerTel.show ? "#dcdcdc" : "#051b37"  //condicional
    }} 
    icon={"whatsapp"} onPress={() => 
        {
             markerTel.show && markerTel.tel !== 0 && Linking.openURL(`http://api.whatsapp.com/send?phone=${markerTel.tel}`)
}        }
    >
         {markerTel.tel === 0 && markerTel.show ? "WHATSAPP (no tiene)" : "WHATSAPP"}
        </Button>
    <Button 
    mode="contained" 
    disabled={!markerTel.show} 
    contentStyle={{ height: "100%" }} 
    style={{ width: "50%", 
    borderRadius: 0, 
    backgroundColor:   !markerTel.show ? "#dcdcdc" : "#051b37" ,//condicional aqui 
    borderLeftWidth: 1, 
    borderLeftColor: "#737373" 
    }} 
    icon="phone" 
    onPress={() => {
        markerTel.show && markerTel.tel !== 0 && Linking.openURL(`tel:+${markerTel.tel}`)
        }
        }>
        {markerTel.tel === 0 && markerTel.show ? "LLAMAR (no tiene número)" : "LLAMAR"}
        </Button>
  </View>
  )
}

export default ContactosBtn