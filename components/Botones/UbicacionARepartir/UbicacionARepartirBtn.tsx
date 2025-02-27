import RutappContext from '@/context/RutappContext'
import { MapCenterPosType } from '@/context/types/LocationType'
import { RepartosArrType } from '@/context/types/RepartosArrType'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

const UbicacionARepartirBtn = () => {
  const {setMapCenterPos} = useContext(RutappContext) as MapCenterPosType;
  const {repartosArr} = useContext(RutappContext) as RepartosArrType;
    const irAUbicacion = ()=>{
       if(repartosArr.length > 0) setMapCenterPos(repartosArr[0])    
    }
  return (
            <View style={{flex: 1,backgroundColor: "#FFFCF0", borderColor: "black", borderWidth: 1}} >
    
    <Button contentStyle={{ height: "100%", flexDirection: "column" }} buttonColor="#FFFCF0" style={{ flex: 1, borderRadius: 0 }} mode="contained-tonal"
    onPress={irAUbicacion}><Icon size={19} source={"map-marker"} color="black" /></Button>
          <Text style={{backgroundColor: "#FFFCF0",paddingVertical: 1 ,width: "100%",fontWeight: "bold",textTransform: "uppercase",fontSize: 6, color: "black",textAlign: "center" }}>ubicación cliente</Text>

    </View>



  )
}

export default UbicacionARepartirBtn