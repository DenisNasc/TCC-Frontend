import React from 'react';

import {LineSeries} from '@devexpress/dx-react-chart-material-ui';

interface Props {
    value: string;
    argument: string;
    name: string;
}

const ChartStation: React.FC<Props> = ({value, argument, name}) => {
    return <LineSeries valueField={value} name={name} argumentField={argument} />;
};

export default ChartStation;
