import React from 'react';
import {CssBaseline, ThemeProvider} from '@material-ui/core';

import darkTheme from 'styles/themes/dark';
import lightTheme from 'styles/themes/light';

import useReduxStore from 'hooks/useReduxStore';

const StyleProvider: React.FC = ({children}) => {
    const {
        app: {darkMode},
    } = useReduxStore();

    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default StyleProvider;
