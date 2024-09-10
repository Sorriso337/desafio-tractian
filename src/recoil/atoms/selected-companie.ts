import { atom } from "recoil";

export const EmpresaSelecionada = atom({
    key: "EmpresaSelecionada",
    default: {
        id: "",
        name: "",
    },
})