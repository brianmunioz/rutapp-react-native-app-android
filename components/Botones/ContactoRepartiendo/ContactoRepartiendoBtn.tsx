import RutappContext from '@/context/RutappContext'
import { RepartosArrType } from '@/context/types/RepartosArrType'
import React, { Fragment, useContext } from 'react'
import { Linking, View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

const ContactoRepartiendoBtn = () => {
    const {repartosArr} = useContext(RutappContext) as RepartosArrType;
    const whatsapp = () =>{ 
        repartosArr[0].telefono != null && Linking.openURL(`http://api.whatsapp.com/send?phone=${repartosArr[0].telefono}`)
        }
        const telefono = ()=>{
            repartosArr[0].telefono != null && Linking.openURL(`tel:+${repartosArr[0].telefono}`)
        }
  return (
    <Fragment>
            <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >

    <Button 
    mode="contained-tonal" 
    disabled={repartosArr[0].telefono == null} 
    contentStyle={{ height: "100%" }} 
    style={{ 
        flex: 1, 
        borderRadius: 0, 
        backgroundColor: repartosArr[0].telefono == null ? "#dcdcdc" : "#c4edbd"
        }} 
        onPress={whatsapp}
        >
            <Icon 
            size={18} 
            source={"whatsapp"} 
            color={repartosArr[0].telefono != null ? "#347928"  : "grey"} 
        /> 
    </Button>
    <Text style={{backgroundColor: "#c4edbd",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>whatsapp</Text>
    </View>
            <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >

    <Button 
    mode="contained-tonal" 
    disabled={!repartosArr[0].telefono == null} 
    contentStyle={{ height: "100%" }} 
    style={{ 
        flex: 1, 
        borderRadius: 0, 
        backgroundColor: repartosArr[0].telefono == null ? "#dcdcdc" : "#e6eff7"
        }} 
        onPress={telefono}> 
        <Icon 
        size={20} 
        source={"phone"} 
        color={repartosArr[0].telefono != null ? "#10375C" : "grey"} 
        />  
        
    </Button>
    <Text style={{backgroundColor: "#e6eff7",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>llamar</Text>
</View>
  </Fragment>  )
}

export default ContactoRepartiendoBtn