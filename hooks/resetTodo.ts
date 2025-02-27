import RutappContext from "@/context/RutappContext";
import { ModoContactoType } from "@/context/types/ModoContactoType";
import { RepartoConContactoType } from "@/context/types/RepartoConContactoType";
import { useContext } from "react";
import { usePedircontactos } from "./pedirContactos";
import { UbicacionSeleccionadaType } from "@/context/types/UbicacionSeleccionadaType";
import { ModalVisibleType } from "@/context/types/ModalVisibleType";
import { AccionUsuarioType } from "@/context/types/AccionUsuarioType";
import { MarkerTelType } from "@/context/types/MarkerTelType";
import { useSQLiteContext } from "expo-sqlite";
import { ContactosArrType } from "@/context/types/ContactosArrType";
import { DataMarkersType } from "@/context/types/DataMarkersType";
import { usePedirRepartos } from "./pedirRepartos";




export function useResetTodo() {
  const {modoContacto} = useContext(RutappContext) as ModoContactoType;
  const {setRepartoConContacto} = useContext(RutappContext) as RepartoConContactoType;
  const {setUbicacionSeleccionada} = useContext(RutappContext) as UbicacionSeleccionadaType;
  const { setModalVisible} = useContext(RutappContext) as ModalVisibleType;
  const {setAccionUsuario} = useContext(RutappContext) as AccionUsuarioType;
  const {setMarkerTel} = useContext(RutappContext) as MarkerTelType;
  const {setDataMarkers} = useContext(RutappContext) as DataMarkersType;
  const {setContactosArr} = useContext(RutappContext) as ContactosArrType;
  const pedirRepartos = usePedirRepartos();
  const pedircontactos = usePedircontactos();


  const db = useSQLiteContext();

  return  function resetTodo() {
    
    if (modoContacto) {
      pedircontactos();
    } else {
      setRepartoConContacto(null);
      pedirRepartos();
    }
    setUbicacionSeleccionada([]);
    setModalVisible(false);
    setAccionUsuario(null);
    setMarkerTel({ id: 0, show: false, tel: 0 });
  };
}
