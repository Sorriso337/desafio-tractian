import { Asset, TreeNode } from '../types';
import { TreeItem } from '@mui/x-tree-view';
import { Box } from '@mui/material';

const Icon = (item: TreeNode) => {
    if (item?.isLocation)
        return (
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.69443 0.222229C3.48031 0.222229 0.055542 3.27778 0.055542 6.94445C0.055542 12.4689 7.69443 19.7778 7.69443 19.7778C7.69443 19.7778 15.3333 12.4689 15.3333 6.94445C15.3333 3.27778 11.9086 0.222229 7.69443 0.222229ZM7.69443 18.0056C5.32638 15.5245 1.32869 10.5378 1.32869 6.94445C1.32869 3.91334 4.19327 1.44445 7.69443 1.44445C9.40045 1.44445 11.0173 2.03112 12.2268 3.10667C13.3981 4.15778 14.0602 5.51445 14.0602 6.94445C14.0602 10.5378 10.0625 15.5245 7.69443 18.0056ZM10.2407 6.94445C10.2407 8.30112 9.10763 9.3889 7.69443 9.3889C6.28124 9.3889 5.14813 8.30112 5.14813 6.94445C5.14813 5.58779 6.28124 4.50001 7.69443 4.50001C9.10763 4.50001 10.2407 5.58779 10.2407 6.94445Z" fill="#2188FF" />
            </svg>
        )
    if (item?.sensorType)
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7572 6.68058L19.7572 6.68051C19.7536 6.66959 19.7486 6.66003 19.7432 6.64977C19.7414 6.64624 19.7395 6.64263 19.7376 6.63884C19.7327 6.62903 19.7278 6.61983 19.7229 6.61062C19.718 6.60141 19.7131 6.5922 19.7081 6.58237L19.7082 6.58241C19.7062 6.57912 19.7042 6.57566 19.7022 6.57212C19.6967 6.56242 19.6908 6.55215 19.6836 6.54318L19.6836 6.54315C19.664 6.5137 19.6419 6.48426 19.6198 6.4548C19.6075 6.44007 19.5928 6.4229 19.5781 6.40819L19.5781 6.40814C19.5683 6.39592 19.5561 6.38613 19.5438 6.37631L19.5437 6.37627C19.5335 6.36608 19.5222 6.35708 19.5113 6.34842C19.5064 6.34458 19.5017 6.3408 19.4971 6.33701L19.7572 6.68058ZM19.7572 6.68058C19.7621 6.69037 19.7658 6.70077 19.7692 6.7112C19.7725 6.7216 19.7756 6.73204 19.7793 6.74186L19.7572 6.68058ZM19.4432 6.2978L19.4431 6.29777L10.4688 0.323879C10.3304 0.231462 10.1678 0.182138 10.0014 0.182138C9.83498 0.182138 9.67232 0.231462 9.53394 0.323879L0.554704 6.30267L0.554646 6.30271L0.554644 6.30271C0.552242 6.30391 0.549829 6.30572 0.547363 6.30757L0.547339 6.30759C0.544902 6.30941 0.542413 6.31128 0.539912 6.31253L0.540001 6.31247C0.527729 6.32229 0.515437 6.33213 0.500686 6.34196L0.500701 6.34195C0.48948 6.34996 0.479333 6.35901 0.46952 6.36775C0.464317 6.37239 0.459207 6.37694 0.454082 6.38121L0.454073 6.38122C0.447963 6.38611 0.44246 6.39161 0.436932 6.39714L0.436922 6.39715C0.431404 6.40266 0.425861 6.40821 0.419699 6.41314L0.419745 6.4131C0.405007 6.42783 0.390308 6.44253 0.378063 6.45968L0.378025 6.45973L0.378022 6.45973C0.353505 6.4867 0.333884 6.51612 0.314248 6.54803C0.311485 6.55264 0.308375 6.55725 0.305188 6.56197C0.304116 6.56356 0.303036 6.56516 0.301957 6.56678C0.297664 6.57322 0.293382 6.57995 0.289715 6.58728L0.289701 6.58731C0.279891 6.60447 0.270079 6.6241 0.260259 6.64374L0.260251 6.64375L0.260232 6.64379C0.256568 6.6499 0.253511 6.65662 0.250442 6.66368C0.249898 6.66493 0.249353 6.66619 0.248805 6.66746C0.246265 6.67335 0.243644 6.67942 0.240608 6.68549L0.240109 6.68525L0.240631 6.68544C0.236954 6.69525 0.233276 6.70567 0.229596 6.71609L0.229586 6.71612C0.225903 6.72656 0.222218 6.737 0.218533 6.74683L0.218011 6.74663L0.21854 6.74681C0.217533 6.74983 0.216528 6.75274 0.215545 6.75559C0.21172 6.76667 0.20823 6.77679 0.206284 6.78846L0.206279 6.78849H0.206278C0.201372 6.81057 0.196465 6.8351 0.191557 6.85964L0.191549 6.85969L0.184189 6.89648C0.179281 6.93329 0.176828 6.97009 0.176828 7.0069V12.9857C0.176828 13.0225 0.17928 13.0593 0.184186 13.0961C0.184187 13.0961 0.184188 13.0961 0.184189 13.0961L0.191548 13.1329L0.191549 13.1329L0.206263 13.204C0.206267 13.2041 0.20627 13.2041 0.206274 13.2041C0.208729 13.2114 0.210572 13.2182 0.212411 13.2249C0.214252 13.2317 0.21609 13.2384 0.21854 13.2458C0.225902 13.2679 0.233265 13.2875 0.240631 13.3071L0.240639 13.3072C0.244279 13.3181 0.249269 13.3276 0.254628 13.3379C0.256472 13.3414 0.258359 13.3451 0.260251 13.3488C0.262753 13.3538 0.265093 13.3587 0.267394 13.3634C0.274141 13.3774 0.280549 13.3906 0.289689 13.4053L0.289695 13.4053C0.29167 13.4086 0.29364 13.412 0.295653 13.4156C0.301179 13.4253 0.30703 13.4355 0.314205 13.4445L0.314224 13.4445C0.318336 13.4503 0.322164 13.456 0.325987 13.4618C0.333615 13.4732 0.341222 13.4846 0.351024 13.496L0.351036 13.4961L0.380493 13.5329C0.392768 13.5476 0.407486 13.5648 0.4222 13.5795L0.422244 13.5795C0.432017 13.5918 0.444244 13.6015 0.456529 13.6114L0.456577 13.6114C0.466767 13.6216 0.478119 13.6306 0.489046 13.6393C0.49389 13.6431 0.49865 13.6469 0.503189 13.6507L0.502832 13.6511M19.4432 6.2978L0.503181 13.6507L0.502832 13.6511M19.4432 6.2978C19.4456 6.299 19.448 6.30081 19.4505 6.30266C19.4529 6.30448 19.4554 6.30635 19.4579 6.30761L19.4432 6.2978ZM0.502832 13.6511C0.515109 13.6609 0.527386 13.6707 0.542118 13.6806L0.240109 13.3073C0.243765 13.3183 0.248782 13.3279 0.254147 13.3382C0.255988 13.3417 0.25787 13.3453 0.259752 13.3491C0.262247 13.3541 0.264583 13.3589 0.266882 13.3637C0.273632 13.3776 0.280058 13.3909 0.289216 13.4056C0.291178 13.4088 0.29314 13.4123 0.295148 13.4158C0.30068 13.4255 0.306564 13.4358 0.313769 13.4448C0.317861 13.4506 0.32168 13.4563 0.325499 13.462C0.333138 13.4735 0.340778 13.4849 0.3506 13.4964L0.380064 13.5332C0.392341 13.548 0.407073 13.5652 0.421805 13.5799C0.431624 13.5922 0.443898 13.602 0.456172 13.6118C0.466395 13.622 0.47779 13.6311 0.488728 13.6397C0.493566 13.6436 0.498314 13.6473 0.502832 13.6511ZM19.6914 13.4448C19.6942 13.4403 19.6973 13.4357 19.7005 13.4309C19.7058 13.423 19.7114 13.4148 19.716 13.4056C19.7209 13.3957 19.7258 13.3865 19.7307 13.3773C19.7357 13.3681 19.7406 13.3589 19.7455 13.3491C19.7498 13.3419 19.7533 13.3338 19.7569 13.3254C19.7595 13.3195 19.7621 13.3134 19.7651 13.3073L19.7646 13.3071C19.7683 13.2973 19.7719 13.2869 19.7756 13.2765C19.7774 13.2716 19.7791 13.2667 19.7808 13.2619C19.7828 13.2564 19.7847 13.251 19.7867 13.2458C19.7916 13.2335 19.7965 13.2188 19.7989 13.2041L19.7989 13.204C19.804 13.189 19.8067 13.1727 19.8095 13.1561C19.8108 13.1485 19.8121 13.1407 19.8137 13.1329L19.821 13.0961C19.8259 13.0593 19.8284 13.0225 19.8284 12.9857V7.00204C19.8235 6.97748 19.8207 6.9529 19.818 6.92835C19.8167 6.91609 19.8153 6.90383 19.8137 6.89159C19.8137 6.89158 19.8137 6.89158 19.8137 6.89157L19.8063 6.85477C19.8048 6.8471 19.8035 6.83969 19.8022 6.83236C19.7994 6.81619 19.7966 6.8005 19.7916 6.78362C19.7906 6.78063 19.7896 6.77773 19.7886 6.77488L19.6914 13.4448ZM0.289216 6.58703C0.279399 6.60421 0.269582 6.62385 0.259765 6.64348L0.289216 6.58703ZM10.8448 2.60009V2.6002L10.8467 2.60146V6.53301H10.8462L10.8469 6.53348L14.5054 8.97901L14.5049 8.97976L14.506 8.97901L17.4598 7.00491L17.4595 7.00444L17.4592 7.00398L17.4587 7.00323L10.8478 2.60087V2.59953H10.8473V2.59897H10.8448V2.59953V2.60009ZM10.8467 2.60009V2.60012L10.8466 2.60009H10.8467ZM9.15495 2.59953H9.1545L2.54292 7.00398L2.54323 7.00444L2.54354 7.00491L2.54404 7.00565L5.49672 8.97901L5.49622 8.97976L5.49734 8.97901L9.15582 6.53348L9.15607 6.53385V6.53301V2.59953H9.15551H9.15495ZM1.86556 8.58078L1.86524 8.58124L1.865 8.58162V11.4044H1.86556H1.86611H1.86656L3.97747 9.99308L3.97716 9.99261L3.97685 9.99215L3.97635 9.9914L1.86587 8.58032L1.86556 8.58078ZM9.15551 17.3832L9.15582 17.3828L9.15607 17.3824V13.4498H9.15652L9.15582 13.4493L5.49734 11.0038L5.49784 11.003L5.49672 11.0038L2.54292 12.9779L2.54323 12.9783L2.54354 12.9788L2.54404 12.9795L9.1552 17.3837L9.15551 17.3832ZM9.99984 11.9868L9.99934 11.9876L10.0005 11.9868L12.9862 9.99062L12.9859 9.99016L12.9856 9.98969L12.9851 9.98895L10.0005 7.99594L10.001 7.99519L9.99984 7.99594L7.01413 9.99215L7.01444 9.99261L7.01475 9.99308L7.01525 9.99382L9.99984 11.9868ZM10.8454 17.3832H10.8458L17.4574 12.9788L17.4571 12.9783L17.4568 12.9779L17.4563 12.9771L14.5036 11.0038L14.5041 11.003L14.503 11.0038L10.8445 13.4493L10.8442 13.4489V13.4498V17.3832H10.8448H10.8454ZM18.1348 11.402L18.1351 11.4015L18.1353 11.4012V8.57833H18.1348H18.1342H18.1337L16.0228 9.98969L16.0231 9.99016L16.0235 9.99062L16.024 9.99137L18.1344 11.4025L18.1348 11.402Z" fill="#2188FF" stroke="#2188FF" strokeWidth="0.00111607" />
            </svg>
        )
    return (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3019 0.61172C10.2847 0.611877 10.2676 0.612455 10.2505 0.613451C10.178 0.618598 10.1065 0.6331 10.038 0.656565C9.98604 0.674479 9.93615 0.697393 9.88904 0.724959L1.23391 5.52414C1.11211 5.5917 1.01097 5.68887 0.94066 5.80587C0.870346 5.92287 0.833334 6.05558 0.833344 6.19068C0.833344 6.19587 0.833704 6.20176 0.833884 6.2073C0.833704 6.21336 0.833884 6.21942 0.833884 6.22565V15.8101C0.833857 15.9493 0.87316 16.086 0.947606 16.2054C1.02205 16.3249 1.12885 16.4228 1.25663 16.4886L9.90824 21.2862C9.92447 21.295 9.94069 21.3032 9.95692 21.311V21.3128C9.98129 21.3241 10.0063 21.3341 10.0317 21.3429C10.0317 21.3438 10.0407 21.3455 10.0425 21.3464C10.0678 21.355 10.093 21.3617 10.1192 21.3676C10.1282 21.3684 10.1291 21.3702 10.1336 21.371C10.1588 21.3762 10.185 21.3807 10.2111 21.3837C10.2111 21.3841 10.2201 21.3844 10.2237 21.3845C10.2508 21.3871 10.2787 21.3889 10.3057 21.3889C10.3328 21.3889 10.3607 21.3871 10.3878 21.3845C10.3878 21.3841 10.3968 21.3838 10.4004 21.3837C10.4265 21.381 10.4524 21.3768 10.4779 21.371C10.4869 21.3702 10.4878 21.3693 10.4923 21.3676C10.5182 21.3617 10.5438 21.3546 10.5689 21.3464C10.5689 21.3455 10.578 21.3438 10.5798 21.3429C10.6052 21.3341 10.6302 21.3241 10.6546 21.3128V21.3111C10.671 21.3033 10.6873 21.295 10.7033 21.2863L19.3551 16.4886C19.4829 16.4229 19.5897 16.325 19.6641 16.2055C19.7385 16.086 19.7778 15.9494 19.7778 15.8102V6.21985C19.7778 6.21206 19.7772 6.20496 19.7771 6.19752H19.7773V6.19059C19.7773 6.0794 19.7521 5.96954 19.7036 5.86859C19.6551 5.76763 19.5844 5.67797 19.4964 5.60578C19.4874 5.59885 19.4793 5.59175 19.4702 5.58492C19.4702 5.58318 19.4612 5.58059 19.4612 5.57885C19.4305 5.55632 19.3982 5.53592 19.3644 5.51782L10.7142 0.720717C10.5878 0.6478 10.4428 0.609868 10.2954 0.611114L10.3019 0.61172ZM10.3109 2.56164C10.3758 2.56164 10.441 2.57783 10.4993 2.61012L16.3912 5.87745C16.6426 6.01684 16.6426 6.36513 16.3912 6.50451L10.4992 9.77184C10.4419 9.80362 10.3769 9.82034 10.3107 9.82034C10.2445 9.82034 10.1795 9.80362 10.1222 9.77184L4.23034 6.50451C3.97903 6.36521 3.97894 6.01684 4.23034 5.87745L10.1224 2.61012C10.1797 2.57841 10.2447 2.56169 10.3108 2.56164H10.3109ZM3.02773 8.15263C3.09576 8.15169 3.16277 8.1686 3.22152 8.20155L9.10206 11.4625C9.15922 11.4941 9.2067 11.5397 9.2397 11.5946C9.27271 11.6495 9.29008 11.7118 9.29008 11.7752V18.2965C9.29008 18.5746 8.97668 18.7484 8.72583 18.6093L2.84556 15.3484C2.78839 15.3167 2.74092 15.2711 2.70792 15.2162C2.67491 15.1613 2.65754 15.099 2.65754 15.0356V8.51426C2.65754 8.30578 2.83375 8.15584 3.02773 8.15263ZM17.5938 8.15263C17.7876 8.1561 17.964 8.3057 17.964 8.51426V15.0355C17.964 15.1645 17.8919 15.2838 17.7758 15.3484L11.8954 18.6093C11.6448 18.7483 11.3313 18.5746 11.3313 18.2964V11.7752C11.3313 11.6462 11.4034 11.527 11.5194 11.4624L17.3997 8.20146C17.4585 8.1685 17.5256 8.15159 17.5937 8.15255L17.5938 8.15263Z" fill="#2188FF" />
        </svg>
    )

}
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
                            <Icon {...node} />
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
