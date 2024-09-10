import { TreeNode } from "../types"

export const TreeNodeIcon = (item: TreeNode) => {
    if ('isLocation' in item)
        return (
            <img src={"https://raw.githubusercontent.com/tractian/challenges/main/assets/location.png"} />
        )
    if ('status' in item && item.status != null)
        return (
            <img src={"https://raw.githubusercontent.com/tractian/challenges/main/assets/component.png"} />
        )
    return (
        <img src={"https://raw.githubusercontent.com/tractian/challenges/main/assets/asset.png"} />
    )

}