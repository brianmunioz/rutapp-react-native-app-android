import IcontactosSQL from "@/interfaces/IContactosSQL";
  
export type ContactosArrType = {
    contactosArr: IcontactosSQL[];
    setContactosArr: (value: IcontactosSQL[]) => void;
  };