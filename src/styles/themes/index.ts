import {Theme} from '@mui/material';
import themeDark from './dark';
import themeLight from './light';

const themesss = {
    dark: themeDark,
    light: themeLight,
};

const selectTheme = (mode: 'dark' | 'light'): Theme => themesss[mode];

export default selectTheme;
