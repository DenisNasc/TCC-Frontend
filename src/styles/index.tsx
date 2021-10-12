import React, {useState, useMemo, createContext} from 'react';
import {PaletteMode, ThemeProvider, CssBaseline} from '@mui/material';

import selectTheme from 'styles/themes/index';

export const ColorModeContext = createContext({toggleColorMode: () => {}});

const StyleProvider: React.FC = ({children}) => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = useMemo(() => selectTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default StyleProvider;
