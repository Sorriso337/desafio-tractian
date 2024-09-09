import { TreeItem } from "@mui/x-tree-view";
import { Asset } from "../types";

export const buildTree = (parentId: string, assets: Asset[]) => {
    return assets
        .filter(asset => asset.parentId === parentId)
        .map(asset => {
            const children = buildTree(asset.id, assets);
            const label = <>{asset.name} </>;
            return (
                <TreeItem
                    key={asset.id}
                    itemId={asset.id}
                    label={label}
                >
                    {children}
                </TreeItem>
            );
        });
};