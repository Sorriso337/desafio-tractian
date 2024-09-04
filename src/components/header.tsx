import { Box, Button, Typography } from "@mui/material";

export function Header() {

    return (
        <Box width='100%' bgcolor='#17192d' height='20%' padding={2} display={'flex'} justifyContent='space-between'>
            <Box>
                <Typography color='white' variant="h4" fontWeight='bold'>
                    TRACTIAN
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
                <Button variant='contained' size='small' style={{ marginRight: 16 }}>
                    Apex unit
                </Button>
                <Button variant='contained' size='small' style={{ marginRight: 16 }}>
                    Tobias unit
                </Button>
                <Button variant='contained' size='small'>
                    Jaguar unit
                </Button>
            </Box>
        </Box>
    )
}