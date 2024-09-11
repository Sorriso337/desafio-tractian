export type Company = {
    id: string;
    name: string;
};

export type Asset = {
    id: string;
    locationId?: string;
    name: string;
    parentId?: string;
    sensorId?: string;
    sensorType?: string;
    status?: string;
    gatewayId?: string;
} & { children?: TreeNode[] };

export type Location = {
    id: string;
    name: string;
    parentId: string;
    isLocation: boolean;
} & { children?: TreeNode[] };

export type TreeNode = Asset | Location;

export type Filters = {
    filtroInput: string;
    apenasSensorEnergia: boolean;
    apenasCritico: boolean;
}
