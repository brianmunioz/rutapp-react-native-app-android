import RutappContext from '@/context/RutappContext';
import { DataMarkersType } from '@/context/types/DataMarkersType';
import { RepartosArrType } from '@/context/types/RepartosArrType';
import IRepartosSQL from '@/interfaces/IRepartosSQL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapMarker } from 'expo-leaflet';
import {  useSQLiteContext } from 'expo-sqlite';
import { useContext } from 'react';


export  function  usePedirRepartos() {
    const {setDataMarkers} = useContext(RutappContext) as DataMarkersType;
    const {setRepartosArr} = useContext(RutappContext) as RepartosArrType;
    const db = useSQLiteContext();
   
    return async function pedirRepartos(){   
      const idsAsync = await AsyncStorage.getItem('ordenrepartos');
      let ids: number[] = idsAsync && idsAsync !== null ? JSON.parse(idsAsync) : [];
    if (!ids) {
      await AsyncStorage.setItem('ordenrepartos', '[]');
    }
    const repartosSQL: IRepartosSQL[] = await db.getAllAsync("SELECT * FROM repartos WHERE finalizado=0");
    if (ids.length === 0 && repartosSQL.length > 0) {
      ids = repartosSQL.map(e => e.id)
      await AsyncStorage.setItem('ordenrepartos', JSON.stringify(ids))
    }
    const orderedRepartos: IRepartosSQL[] = [];
    if (ids && ids.length > 0) {
      ids.map(id => {
        const repartoEncontrado = repartosSQL.find(e => e.id === id);
        if (repartoEncontrado) orderedRepartos.push(repartoEncontrado)
      })
    }
    setRepartosArr(orderedRepartos)
    const nuevosrepartos: MapMarker[] = orderedRepartos.map((e) => {
      return {
        id: e.id.toString(),
        position: { lat: e.lat, lng: e?.lng },
        icon: `
        <div 
          style="position: relative; cursor: pointer;" 
          onclick="
            const tooltip = this.querySelector('.tooltip-${e.id}');
            const isVisible = tooltip.style.display === 'block';
      
            // Ajusta la opacidad de todos los otros pins
            document.querySelectorAll('.map-pin').forEach(pin => {
              pin.style.opacity = isVisible ? '1' : '0.2'; // Reduce la opacidad si el tooltip está abierto
              if (pin === this) {
                pin.style.opacity = '1'; // Asegura que el pin clickeado esté completamente visible
              }
            });
      
            // Alterna la visibilidad del tooltip
            document.querySelectorAll('.tooltip').forEach(t => t.style.display = 'none'); // Cierra otros tooltips
            tooltip.style.display = isVisible ? 'none' : 'block';  // Alterna la visibilidad del tooltip
      
            // Ajusta el z-index del pin actual
            this.style.zIndex = isVisible ? 1 : 9999;
          "
          class="map-pin"
        >
          <div style="z-index: 1; position: relative;"> 
          <svg fill=${e.tipo_contacto == "proveedor" ? 'red' : 'green'} style="width:30px;height:30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>
          </div>
          <p 
            class="tooltip tooltip-${e.id}" 
            style="display:none; position:absolute;font-weight:600 ;width: 250px;color:#3c3c3c; flex-wrap: wrap; white-space: wrap; top:15px; left:15px; border-radius: 5px; background:white; padding:5px; border:1px solid #ccc; z-index: 10000;" 
          >   <span style="font-weight: bold;color: #000">${e.tipo_contacto.toUpperCase()}:</span> ${e.nombre} <br/>
            <span style="font-weight: bold;color: #000">DIRECCIÓN:</span> ${e.direccion} <br/>
            <span style="font-weight: bold;color: #000">TELÉFONO:</span> ${e.telefono || "no tiene"} <br/>
            <span style="font-weight: bold;color: #000">FECHA DE CREACIÓN:</span> ${e.fecha || "no tiene"} <br/>
            <span style="font-weight: bold;color: #000">DESCRIPCIÓN:</span> ${e.descripcion || "no hay"}                
          </p>
        </div>`,
        size: [15, 15],
      }
    })
    setDataMarkers(nuevosrepartos)
  }
  }