import { FixedSizeList as List } from 'react-window';
import { Asset, Location } from '../types';
import { flattenTree } from '../utils';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

const renderTree = (nodes: Array<Asset>) => (
    nodes.map((node) => {
        if (!node) return null;
        return (
            <TreeItem key={node.id} itemId={node.id} label={node.name}>
                {node?.children != undefined && node?.children?.length > 0 ? renderTree(node?.children) : null}
            </TreeItem>
        )
    })
);

const TreeViewVirtualized = ({ data }: { data: Array<Asset | Location> }) => {
    const flatData = flattenTree(data);

    return (
        <List
            height={600}
            itemCount={flatData.length}
            itemSize={35}
            width={'100%'}
        >
            {({ index }) => (
                <SimpleTreeView>
                    {renderTree([data[index]])}
                </SimpleTreeView>
            )}
        </List>
    );
};

export default TreeViewVirtualized;
