import { Asset, Filters, TreeNode } from '../types';
import { TreeItem } from '@mui/x-tree-view';
import { Box } from '@mui/material';
import { TreeNodeIcon } from './tree-node-icon';

function filterTreeByStatus(node: TreeNode) {
    if (!node.children || node.children.length == 0) {
        return 'status' in node && node.status == "alert" ? node : null;
    }
}

export const renderTree = (nodes: Array<TreeNode>, onClick: (node: Asset) => void, filters: Filters) => (
    nodes.map((node) => {
        const possuiFilhos = node?.children != undefined && node?.children?.length > 0

        if (filters.apenasCritico) {

            const filteredChildren = node.children
                .map(child => filterTreeByStatus(child))
                .filter(child => child != null);

            if (filteredChildren.length != 0)
                console.log(filteredChildren)
        }

        return (
            <TreeItem
                key={node.id}
                itemId={node.id}
                onClick={
                    () => {
                        if (!possuiFilhos)
                            onClick(node)
                    }
                }
                label={
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TreeNodeIcon {...node} />
                            {node.name}
                        </Box>
                    </>
                }
            >
                {possuiFilhos ? renderTree(node?.children as TreeNode[], onClick, filters) : null}
            </TreeItem>
        )
    })
);
