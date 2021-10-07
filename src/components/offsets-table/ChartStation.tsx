import React from 'react';

import useStore from 'hooks/useReduxStore';

const ChartStation: React.FC = () => {
    const {user} = useStore();

    return <div>oi</div>;
};

export default ChartStation;
