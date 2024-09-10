import { Asset, Location, TreeNode } from "../types";

export const buildTree = (parentId: string | null, items: Array<Asset | Location>): TreeNode[] => {
    return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: buildTree(item.id, items),
        }));
};
