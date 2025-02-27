export type Mensaje = {
    mensaje:string;
    tag:string;
  };
  
export type MensajeType = {
    mensaje: Mensaje;
    setMensaje: (value: Mensaje) => void;
  };