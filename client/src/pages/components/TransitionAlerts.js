import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({messages, style, onChange}) {
    return (
        <Box style={style}>
            <Alert severity={"error"}
                   action={
                       <IconButton
                           aria-label="close"
                           color="inherit"
                           size="small"
                           onClick={() => {
                               onChange(false)
                           }}
                       >
                           <CloseIcon fontSize="inherit"/>
                       </IconButton>
                   }
                   sx={{mb: 2}}
            >
                {messages}
            </Alert>
        </Box>
    );
}