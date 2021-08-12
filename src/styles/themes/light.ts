import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(','),
        fontSize: 14,
    },
    palette: {
        type: 'light',
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#607D8B',
        },
        background: {
            paper: '#42A5F5',
            default: '#E3E7F1',
        },
    },
});

export default theme;
