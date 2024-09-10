import { atom } from "recoil";

export const AssetSelecionado = atom({
    key: "AssetSelecionado",
    default: {
        id: "",
        locationId: "",
        name: "",
        parentId: "",
        sensorId: "",
        sensorType: "",
        status: "",
        gatewayId: "",
    },
})