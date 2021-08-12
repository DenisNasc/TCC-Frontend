import {useEffect} from 'react';

import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';
import {CURRENT_PROJECT_UPDATE} from 'state/actions/currentProject';

import type {ResponseGetStations} from 'types/fetch/stations';
import type {ResponseGetCoordinates} from 'types/fetch/coordinates';

interface HookParams {
    userID: string;
    projectID: string;
}

const useGetStationsCoordinates = (params: HookParams): void => {
    const dispatch = useDispatch();
    const axiosDev = axiosDevInstance();

    const {userID, projectID} = params;

    useEffect(() => {
        const getStationsData = async () => {
            const {
                data: {stations},
            } = await axiosDev.get<ResponseGetStations>(
                `/users/${userID}/projects/${projectID}/stations`
            );

            const formatedStationsPromises = stations.map(async station => {
                const {id} = station;

                const {
                    data: {coordinates},
                } = await axiosDev.get<ResponseGetCoordinates>(
                    `/users/${userID}/projects/${projectID}/stations/${id}/coordinates`
                );

                const formatedStation = {...station, coordinates};
                return formatedStation;
            });

            const formatedStations = await Promise.all(formatedStationsPromises);

            const payload = {stations: formatedStations};
            dispatch({type: CURRENT_PROJECT_UPDATE, payload});
        };

        getStationsData();
    }, [userID, projectID]);
};

export default useGetStationsCoordinates;
