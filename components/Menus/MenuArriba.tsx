import React, { useContext } from 'react'
import { View } from 'react-native'
import CambiarModoBtn from '../Botones/CambiarModo/CambiarModoBtn'
import MiUbicacionBtn from '../Botones/MiUbicacion/MiUbicacionBtn'
import UbicacionARepartirBtn from '../Botones/UbicacionARepartir/UbicacionARepartirBtn'
import RutappContext from '@/context/RutappContext'
import { ModoContactoType } from '@/context/types/ModoContactoType'
import EditarBtn from '../Botones/Editar/EditarBtn'
import VolverAlMapaBtn from '../Botones/VolverAlMapa/VolverAlMapaBtn'
import AgregarBtn from '../Botones/Agregar/AgregarBtn'
import ContactoRepartiendoBtn from '../Botones/ContactoRepartiendo/ContactoRepartiendoBtn'
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType'

const MenuArriba = () => {
  const {modoContacto } = useContext(
    RutappContext
  ) as ModoContactoType;
  const {accionUsuario} = useContext(RutappContext) as AccionUsuarioType

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: 50 }}>
        {accionUsuario != "repartiendo" &&<CambiarModoBtn/>}
        <MiUbicacionBtn/>
        {!modoContacto &&accionUsuario == "repartiendo"&& <UbicacionARepartirBtn/>}
        {accionUsuario != "repartiendo" &&<EditarBtn/>}
        {accionUsuario != "repartiendo" &&<VolverAlMapaBtn/>}
        {accionUsuario != "repartiendo" && <AgregarBtn/>}
        {accionUsuario == "repartiendo" && <ContactoRepartiendoBtn/>} 
        
    </View>
  )
}

export default MenuArriba