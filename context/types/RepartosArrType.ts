import IRepartosSQL from "@/interfaces/IRepartosSQL";

export type RepartosArrType = {
    repartosArr: IRepartosSQL[];
    setRepartosArr: (value:IRepartosSQL[]) =>void;

};