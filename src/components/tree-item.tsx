import { Asset } from '../types';
import { TreeItem } from '@mui/x-tree-view';
import { Box } from '@mui/material';
import { TreeNodeIcon } from './tree-node-icon';

export const renderTree = (nodes: Array<Asset>) => (
    nodes.map((node) => {
        const arvoreAcabou = !(node?.children != undefined && node?.children?.length > 0)
        return (
            <TreeItem
                key={node.id}
                itemId={node.id}
                onClick={
                    () => {
                        if (arvoreAcabou)
                            console.log(node)
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
                {node?.children != undefined && node?.children?.length > 0 ? renderTree(node?.children) : null}
            </TreeItem>
        )
    })
);
