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
            paper: '#BDBDBD',
            default: '#E3E7F1',
        },
    },
});

export default theme;
