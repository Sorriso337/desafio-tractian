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
};