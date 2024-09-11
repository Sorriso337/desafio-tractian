import { Asset, Filters, TreeNode } from '../types';
import { TreeItem } from '@mui/x-tree-view';
import { Box } from '@mui/material';
import { TreeNodeIcon } from './tree-node-icon';

export const renderTree = (
    nodes: Array<TreeNode>,
    onClick: (node: Asset) => void,
    filters: Filters
) => {

    const filterAndRenderTree = (node: TreeNode): TreeNode | null => {

        if (filters.apenasCritico) {

            const filteredChildren = node.children
                ? node.children
                    .map(filterAndRenderTree)
                    .filter(child => child !== null)
                : [];

            if (filteredChildren.length > 0 || node.status === 'alert') {
                return {
                    ...node,
                    children: filteredChildren,
                };
            } else {
                return null;
            }
        }

        if (filters.apenasSensorEnergia) {

            const filteredChildren = node.children
                ? node.children
                    .map(filterAndRenderTree)
                    .filter(child => child !== null)
                : [];

            if (filteredChildren.length > 0 || node.sensorType === 'energy') {
                return {
                    ...node,
                    children: filteredChildren,
                };
            } else {
                return null;
            }
        }

        return {
            ...node,
            children: node.children?.map(filterAndRenderTree).filter(child => child !== null) || [],
        };
    };

    const filteredForest = nodes
        .map(filterAndRenderTree)
        .filter(root => root !== null);

    return (
        <>
            {filteredForest.map((node) => (
                <TreeItem
                    key={node.id}
                    itemId={node.id}
                    onClick={() => {
                        if (node.children?.length === 0) {
                            onClick(node);
                        }
                    }}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TreeNodeIcon {...node} />
                            {node.name}
                        </Box>
                    }
                >
                    {node.children?.length > 0 ? renderTree(node.children, onClick, filters) : null}
                </TreeItem>
            ))}
        </>
    );
};
