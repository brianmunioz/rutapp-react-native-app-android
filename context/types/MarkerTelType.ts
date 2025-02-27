export type MarkerTel = {
     id: number;
    show: boolean;
     tel: number; 
}
export type MarkerTelType = {
    markerTel: MarkerTel;
    setMarkerTel: (value: MarkerTel)=>void;
}