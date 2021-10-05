import {createTheme} from '@material-ui/core/styles';

export const theme = createTheme({
    typography: {
        fontFamily: ['Cambria'].join(','),
        fontSize: 14,
    },
    palette: {
        type: 'light',
        primary: {
            main: '#546E7A',
            contrastText: '#FFF',
        },

        secondary: {
            main: '#8D6E63',
            contrastText: '#FFF',
        },
        background: {
            paper: '#B0BEC5',
            default: '#fff',
        },
    },
});

export default theme;
