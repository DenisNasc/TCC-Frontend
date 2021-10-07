import {createTheme} from '@material-ui/core/styles';

export const theme = createTheme({
    typography: {
        fontFamily: ['Noto Sans', 'Cantarell'].join(','),
        fontSize: 14,
    },
    palette: {
        type: 'light',
        primary: {
            main: '#546E7A',
            contrastText: '#FFF',
        },

        secondary: {
            main: 'rgb(95, 99, 104)',
        },
        background: {
            paper: 'rgb(235, 237, 240)',
            default: 'rgb(255, 255, 255)',
        },
    },
});

export default theme;
