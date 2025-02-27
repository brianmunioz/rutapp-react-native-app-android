export type LocationCoordenadas = {
    lat: number;
  lng: number;
}

export type MapCenterPosType = {
    mapCenterPos: LocationCoordenadas;
    setMapCenterPos: (value:LocationCoordenadas)=>void;
}
export type ActualPosType = {
    actualPos: LocationCoordenadas;
    setActualPos: (value:LocationCoordenadas)=>void;
}
export type OwnPositionType = {
    ownPosition: null|LocationCoordenadas;
    setOwnPosition: (value:null|LocationCoordenadas)=>void;
}