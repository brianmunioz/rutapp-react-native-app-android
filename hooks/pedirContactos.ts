import IcontactosSQL from "@/interfaces/IContactosSQL";
import { useSQLiteContext } from "expo-sqlite";
import { MapMarker } from "expo-leaflet";
import { useContext } from "react";
import RutappContext from "@/context/RutappContext";
import { DataMarkersType } from "@/context/types/DataMarkersType";
import { ContactosArrType } from "@/context/types/ContactosArrType";



export function usePedircontactos() {
  const { setDataMarkers } = useContext(RutappContext) as DataMarkersType;
  const { setContactosArr } = useContext(RutappContext) as ContactosArrType;
  const db = useSQLiteContext();

  return async function pedirContactos() {
    const contactossql: IcontactosSQL[] = await db.getAllAsync("SELECT * FROM contactos");

    setContactosArr(contactossql)
    const nuevoscontactos: MapMarker[] = contactossql.map((e) => {
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
          <svg fill=${e.tipo == "proveedor" ? 'red' : 'green'} style="width:30px;height:30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>
          </div>
          <p 
            class="tooltip tooltip-${e.id}" 
            style="display:none; position:absolute;font-weight:600 ;flex-wrap:wrap; width:250px ; white-space: wrap; top:15px; left:15px; border-radius: 5px; background:white; color: #3c3c3c; padding:5px; border:1px solid #ccc; z-index: 10000;" 
          >   <span style="font-weight: bold;color: #000">${e.tipo.toUpperCase()}:</span> ${e.nombre} <br/>
            <span style="font-weight: bold;color: #000">DIRECCIÓN:</span> ${e.direccion} <br/>
            <span style="font-weight: bold;color: #000">TELÉFONO:</span> ${e.telefono || "no tiene"} <br/>
            <span style="font-weight: bold;color: #000">NOTA:</span> ${e.notas || "no hay"}    
          </p>
        </div>`,
        size: [15, 15],
      }
    })
    setDataMarkers(nuevoscontactos)
  }

}