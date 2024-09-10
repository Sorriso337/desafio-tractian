import { atom } from "recoil";

export const Filtros = atom({
    key: "Filtros",
    default: {
        filtroInput: "",
        apenasSensorEnergia: false,
        apenasCritico: false,
    },
})