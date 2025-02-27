import CrearContacto from '@/components/Acciones/CrearContacto';
import CrearReparto from '@/components/Acciones/CrearReparto';
import ListEditar from '@/components/lists/ListEditar';
import ListEditarReparto from '@/components/lists/ListEditarReparto';
import MenuAbajo from '@/components/Menus/MenuAbajo';
import MenuArriba from '@/components/Menus/MenuArriba';
import MyMap from '@/components/MyMap';
import TextoDeAccion from '@/components/TextoDeAccion';
import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { EditarType } from '@/context/types/EditarType';
import { FollowMyLocationType } from '@/context/types/FollowMyLocationType';
import { MapCenterPosType, OwnPositionType } from '@/context/types/LocationType';
import { MensajeSnackType } from '@/context/types/MensajeSnack';
import { ModalVisibleType } from '@/context/types/ModalVisibleType';
import { ModoContactoType } from "@/context/types/ModoContactoType";
import { UbicacionSeleccionadaType } from '@/context/types/UbicacionSeleccionadaType';
import { ZoomType } from '@/context/types/ZoomType';
import { useGetMyLocation } from '@/hooks/getMyLocation';
import { usePedircontactos } from '@/hooks/pedirContactos';
import { usePedirRepartos } from '@/hooks/pedirRepartos';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const HomeScreen = () => {
  const { mensajeSnack, setMensajeSnack } = useContext(RutappContext) as MensajeSnackType;
  const { modoContacto } = useContext(RutappContext) as ModoContactoType;
  const { accionUsuario } = useContext(RutappContext) as AccionUsuarioType;
  const { modalVisible } = useContext(RutappContext) as ModalVisibleType;
  const db = useSQLiteContext();
  const pedirContactos = usePedircontactos();
  const pedirRepartos = usePedirRepartos();

  const { editar } = useContext(RutappContext) as EditarType;
  const { ubicacionSeleccionada } = useContext(RutappContext) as UbicacionSeleccionadaType;
  const {ownPosition, setOwnPosition} = useContext(RutappContext) as  OwnPositionType;
  const {setMapCenterPos} = useContext(RutappContext) as  MapCenterPosType;
  const {followMyLocation,setFollowMyLocation} = useContext(RutappContext) as FollowMyLocationType;
  const{ zoom,setZoom} = useContext(RutappContext) as ZoomType;

  const getSingleLocationAsync = useGetMyLocation();
  useEffect(() => {
    if (modoContacto) {
      pedirContactos();
    } else {
      pedirRepartos();
    }
  }, [modoContacto])
  useEffect(()=>{
    if(!ownPosition || ownPosition == null) {
      
      getSingleLocationAsync().then(async e=>
      {
        if(e != null){
          setOwnPosition(e);
          setMapCenterPos(e);
          setFollowMyLocation(true)
        }

      }

      );
    };

    if(followMyLocation != false && ownPosition) {
      
      setMapCenterPos({
        lat: ownPosition.lat,
        lng: ownPosition.lng,
      });
     
      setZoom(17)
    }
  },[followMyLocation])
  return (
    <View
      style={styles.container}>
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>

        <TextoDeAccion />
        <MenuArriba />
        {editar && !modoContacto &&  <ListEditarReparto /> }
      {editar && modoContacto && <ListEditar /> }

        {!modalVisible && !editar && <MyMap />}

        {modoContacto && accionUsuario === "crear" && ubicacionSeleccionada && modalVisible &&
          <CrearContacto />}

        {!modoContacto && accionUsuario === "crear" && ubicacionSeleccionada && modalVisible &&
          <CrearReparto />}

        <MenuAbajo />
        <Snackbar
          icon="alert"
          visible={mensajeSnack.bool}
          onDismiss={() => setMensajeSnack({ ...mensajeSnack, bool: false })}  >
          {mensajeSnack.texto}
        </Snackbar>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor:"#FFFCF0"
  },

});

export default HomeScreen