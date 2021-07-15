import React from 'react';

import {Alert} from '@material-ui/lab';

export interface PropsDisplayMessage {
    message: string;
    type: 'error' | 'info' | 'success' | 'warning';
}

const DisplayMessage: React.FC<PropsDisplayMessage> = ({message, type}) => {
    return (
        <Alert severity={type} variant="standard">
            {message}
        </Alert>
    );
};

export default DisplayMessage;
