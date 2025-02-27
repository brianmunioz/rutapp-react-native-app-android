import RutappContext from '@/context/RutappContext';
import { AccionUsuarioType } from '@/context/types/AccionUsuarioType';
import { ModoContactoType } from '@/context/types/ModoContactoType';
import React, { useContext } from 'react'
import EmpezarBtn from '../Botones/Empezar/EmpezarBtn';
import RepartiendoBtn from '../Botones/Repartiendo/RepartiendoBtn';
import ContactosBtn from '../Botones/Contactos/ContactosBtn';
import CrearBtn from '../Botones/Agregar/CrearBtn';
import { ModalVisibleType } from '@/context/types/ModalVisibleType';
import { EditarType } from '@/context/types/EditarType';


const MenuAbajo = () => {
  const {accionUsuario} = useContext(RutappContext) as AccionUsuarioType;
  const {modoContacto } = useContext(RutappContext ) as ModoContactoType;
  const {modalVisible} = useContext(RutappContext ) as ModalVisibleType;
  const {editar } = useContext(RutappContext ) as EditarType;

  if(!modoContacto && accionUsuario == null){
    return <EmpezarBtn/>
  }
  else if(accionUsuario == "repartiendo" && !modoContacto ){
    return <RepartiendoBtn/>
  }
  else if(accionUsuario == null && modoContacto){
    return <ContactosBtn/>
  }else if(accionUsuario === "crear" && !modalVisible && !editar ){
    return <CrearBtn/>
  }
 
}

export default MenuAbajo