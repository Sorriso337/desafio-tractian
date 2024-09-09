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

export type Location = {
    id: string;
    name: string;
    parentId: string;
};

export type TreeNode = Asset | Location & { children?: TreeNode[] };
