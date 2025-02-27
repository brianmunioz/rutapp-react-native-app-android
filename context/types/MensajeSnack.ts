export type MensajeSnack = {
    bool:boolean;
    texto:string;
  };
  
export type MensajeSnackType = {
    mensajeSnack: MensajeSnack;
    setMensajeSnack: (value: MensajeSnack) => void;
  };