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

            if (filteredChildren.length > 0 || ('status' in node && node.status === 'alert')) {
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

            if (filteredChildren.length > 0 || ('sensorType' in node && node.sensorType === 'energy')) {
                return {
                    ...node,
                    children: filteredChildren,
                };
            } else {
                return null;
            }
        }

        if (filters.filtroInput != "") {
            const filteredChildren = node.children
                ? node.children
                    .map(filterAndRenderTree)
                    .filter(child => child !== null)
                : [];

            const nodeNameMatches = node.name.toLowerCase().includes(filters.filtroInput.toLowerCase());
            const childrenMatch = filteredChildren.length > 0;

            if (nodeNameMatches || childrenMatch) {
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
                            {
                                'status' in node && node.status &&
                                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                                    <path d="M2.40167 7.72576H0.593342C0.360008 7.72576 0.187439 7.62125 0.0756332 7.41222C-0.0361724 7.20319 -0.0240196 7.00145 0.112092 6.80701L4.47251 0.536175C4.56973 0.400064 4.69612 0.305273 4.85168 0.2518C5.00723 0.198328 5.16765 0.200759 5.33293 0.259092C5.4982 0.317425 5.61973 0.419509 5.69751 0.565342C5.77529 0.711175 5.80445 0.866731 5.78501 1.03201L5.31834 4.80909H7.57876C7.83154 4.80909 8.00897 4.9209 8.11105 5.14451C8.21313 5.36812 8.18154 5.57715 8.01626 5.77159L3.21834 11.5174C3.1114 11.6438 2.98015 11.7265 2.82459 11.7653C2.66904 11.8042 2.51834 11.7896 2.37251 11.7216C2.22668 11.6535 2.11244 11.549 2.0298 11.4081C1.94716 11.2671 1.91556 11.114 1.93501 10.9487L2.40167 7.72576Z"
                                        fill={node.status == "alert" ? "#ED3833" : "#52C41A"} />
                                </svg>
                            }

                        </Box>
                    }
                >
                    {node.children?.length as number > 0 ? renderTree(node.children as TreeNode[], onClick, filters) : null}
                </TreeItem>
            ))}
        </>
    );
};
