import React from 'react';
import {Provider} from 'react-redux';
import Routes from 'components/Routes';

import store from 'state/store';

import StyleProvider from 'styles';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <StyleProvider>
                <Routes />
            </StyleProvider>
        </Provider>
    );
};

export default App;
