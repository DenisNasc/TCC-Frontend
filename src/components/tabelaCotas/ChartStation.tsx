import React from 'react';

import {LineSeries} from '@devexpress/dx-react-chart-material-ui';

interface Props {
    value: string;
    argument: string;
    name: string;
}

const ChartStation: React.FC<Props> = ({value, argument, name}) => {
    console.log(value, argument);
    return <LineSeries name={name} valueField={value} argumentField={argument} />;
};

export default ChartStation;
