import {createTheme} from '@material-ui/core/styles';

export const theme = createTheme({
    typography: {
        fontFamily: ['Cambria'].join(','),
        fontSize: 14,
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#fff',
            contrastText: '#000',
        },

        secondary: {
            main: '#f0f',
            contrastText: '#FFF',
        },
        background: {
            paper: '#f0f',
            default: '#E3E7F1',
        },
    },
});

export default theme;
