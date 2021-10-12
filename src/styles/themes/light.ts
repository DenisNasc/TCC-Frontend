import {createTheme} from '@mui/material';

export const theme = createTheme({
    typography: {
        fontFamily: ['Noto Sans', 'Cantarell'].join(','),
        fontSize: 14,
    },

    palette: {
        mode: 'light',
    },
});

export default theme;
