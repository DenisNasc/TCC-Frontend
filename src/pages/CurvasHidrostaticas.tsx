import React, {useEffect} from 'react';

import DefaultTemplate from 'styles/templates';

import useStore from 'hooks/useReduxStore';
import {axiosDevInstance} from 'fetch/axiosInstances';

const CurvasHidrostaticas: React.FC = () => {
    const axiosDev = axiosDevInstance();
    const {
        currentProject: {id: projectID, userID},
    } = useStore();

    useEffect(() => {
        const fetchHidrostatics = async () => {
            const url = `/users/${userID}/projects/${projectID}/hidrostatics`;
            const {data} = await axiosDev.get(url);

            console.log(data);
        };

        fetchHidrostatics();
    }, []);

    return (
        <DefaultTemplate title="curvas hidrostaticas">
            <div>oi</div>
        </DefaultTemplate>
    );
};

export default CurvasHidrostaticas;
