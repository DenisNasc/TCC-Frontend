import {
    CURRENT_PROJECT_UPDATE,
    CURRENT_PROJECT_RESTART,
    CURRENT_PROJECT_CREATE_STATION,
    CURRENT_PROJECT_ADD_CORDINATE,
    CURRENT_PROJECT_DEL_CORDINATE,
} from 'state/actions/currentProject';
import type {
    TypeCurrentProjectReducer,
    TypeCurrentProjectState,
    TypeCurrentProjectAction,
} from './types';

const initialState: TypeCurrentProjectState = {
    id: '',
    userID: '',
    name: '',

    shipyard: '',
    engineer: '',

    lengthOverall: 0,
    lengthPerpendiculars: 0,
    breadth: 0,
    draft: 0,

    stations: [],

    createdAt: '',
    updatedAt: '',
};

const currentProjectReducer: TypeCurrentProjectReducer = (
    state = initialState,
    action: TypeCurrentProjectAction
) => {
    const {type, payload} = action;

    switch (type) {
        case CURRENT_PROJECT_UPDATE: {
            return {...state, ...payload};
        }
        case CURRENT_PROJECT_CREATE_STATION: {
            return {...state, stations: state.stations.concat(payload.stations || [])};
        }
        case CURRENT_PROJECT_ADD_CORDINATE: {
            const {stations} = state;
            const {coordinates} = payload;

            const newStations = stations.map(station => {
                const newCoordinates = coordinates?.filter(e => e.stationID === station.id);

                return {
                    ...station,
                    coordinates: newCoordinates?.length ? newCoordinates : station.coordinates,
                };
            });

            return {...state, stations: newStations};
        }

        case CURRENT_PROJECT_DEL_CORDINATE: {
            const {stations} = state;
            const {coordinateID} = payload;

            const newStations = stations.map(station => {
                const newCoordinates = station.coordinates?.filter(e => e.id !== coordinateID);

                return {
                    ...station,
                    coordinates: newCoordinates,
                };
            });

            return {...state, stations: newStations};
        }

        case CURRENT_PROJECT_RESTART: {
            return {...initialState};
        }

        default: {
            return {...state};
        }
    }
};

export default currentProjectReducer;

// const dataTest = [
//     {
//         name: 'station_27.5',
//         longitudinal: 27.5,
//         order: 0,
//         coordinates: [
//             {
//                 order: 0,
//                 vertical: 5.0,
//                 transversal: 3.0,
//             },
//             {
//                 order: 1,
//                 vertical: 5.0,
//                 transversal: 2.5,
//             },
//             {
//                 order: 2,
//                 vertical: 4.999,
//                 transversal: 2.0,
//             },
//             {
//                 order: 3,
//                 vertical: 4.867,
//                 transversal: 1.592,
//             },
//             {
//                 order: 4,
//                 vertical: 4.698,
//                 transversal: 1.07,
//             },
//             {
//                 order: 5,
//                 vertical: 4.652,
//                 transversal: 0.941,
//             },
//             {
//                 order: 6,
//                 vertical: 4.593,
//                 transversal: 0.809,
//             },
//             {
//                 order: 7,
//                 vertical: 4.556,
//                 transversal: 0.744,
//             },
//             {
//                 order: 8,
//                 vertical: 4.513,
//                 transversal: 0.68,
//             },
//             {
//                 order: 9,
//                 vertical: 4.462,
//                 transversal: 0.617,
//             },
//             {
//                 order: 10,
//                 vertical: 4.404,
//                 transversal: 0.555,
//             },
//             {
//                 order: 11,
//                 vertical: 4.337,
//                 transversal: 0.495,
//             },
//             {
//                 order: 12,
//                 vertical: 4.26,
//                 transversal: 0.438,
//             },
//             {
//                 order: 13,
//                 vertical: 4.172,
//                 transversal: 0.383,
//             },
//             {
//                 order: 14,
//                 vertical: 4.073,
//                 transversal: 0.332,
//             },
//             {
//                 order: 15,
//                 vertical: 3.961,
//                 transversal: 0.284,
//             },
//             {
//                 order: 16,
//                 vertical: 3.835,
//                 transversal: 0.24,
//             },
//             {
//                 order: 17,
//                 vertical: 3.694,
//                 transversal: 0.2,
//             },
//             {
//                 order: 18,
//                 vertical: 3.538,
//                 transversal: 0.165,
//             },
//             {
//                 order: 19,
//                 vertical: 3.368,
//                 transversal: 0.134,
//             },
//             {
//                 order: 20,
//                 vertical: 3.184,
//                 transversal: 0.107,
//             },
//             {
//                 order: 21,
//                 vertical: 2.988,
//                 transversal: 0.084,
//             },
//             {
//                 order: 22,
//                 vertical: 2.78,
//                 transversal: 0.065,
//             },
//             {
//                 order: 23,
//                 vertical: 2.561,
//                 transversal: 0.049,
//             },
//             {
//                 order: 24,
//                 vertical: 2.333,
//                 transversal: 0.036,
//             },
//             {
//                 order: 25,
//                 vertical: 2.095,
//                 transversal: 0.025,
//             },
//             {
//                 order: 26,
//                 vertical: 1.599,
//                 transversal: 0.011,
//             },
//             {
//                 order: 27,
//                 vertical: 1.079,
//                 transversal: 0.003,
//             },
//             {
//                 order: 28,
//                 vertical: 0.543,
//                 transversal: 0.0,
//             },
//             {
//                 order: 29,
//                 vertical: 0.0,
//                 transversal: 0.0,
//             },
//         ],
//     },
//     {
//         name: 'station_28.6',
//         longitudinal: 28.6,
//         order: 1,
//         coordinates: [
//             {
//                 order: 0,
//                 vertical: 5.0,
//                 transversal: 3.0,
//             },
//             {
//                 order: 1,
//                 vertical: 4.999,
//                 transversal: 2.5,
//             },
//             {
//                 order: 2,
//                 vertical: 4.994,
//                 transversal: 2.0,
//             },
//             {
//                 order: 3,
//                 vertical: 4.784,
//                 transversal: 1.372,
//             },
//             {
//                 order: 4,
//                 vertical: 4.68,
//                 transversal: 1.07,
//             },
//             {
//                 order: 5,
//                 vertical: 4.63,
//                 transversal: 0.941,
//             },
//             {
//                 order: 6,
//                 vertical: 4.567,
//                 transversal: 0.809,
//             },
//             {
//                 order: 7,
//                 vertical: 4.528,
//                 transversal: 0.744,
//             },
//             {
//                 order: 8,
//                 vertical: 4.483,
//                 transversal: 0.68,
//             },
//             {
//                 order: 9,
//                 vertical: 4.431,
//                 transversal: 0.617,
//             },
//             {
//                 order: 10,
//                 vertical: 4.372,
//                 transversal: 0.555,
//             },
//             {
//                 order: 11,
//                 vertical: 4.303,
//                 transversal: 0.495,
//             },
//             {
//                 order: 12,
//                 vertical: 4.225,
//                 transversal: 0.438,
//             },
//             {
//                 order: 13,
//                 vertical: 4.136,
//                 transversal: 0.383,
//             },
//             {
//                 order: 14,
//                 vertical: 4.036,
//                 transversal: 0.332,
//             },
//             {
//                 order: 15,
//                 vertical: 3.923,
//                 transversal: 0.284,
//             },
//             {
//                 order: 16,
//                 vertical: 3.797,
//                 transversal: 0.24,
//             },
//             {
//                 order: 17,
//                 vertical: 3.656,
//                 transversal: 0.2,
//             },
//             {
//                 order: 18,
//                 vertical: 3.501,
//                 transversal: 0.165,
//             },
//             {
//                 order: 19,
//                 vertical: 3.332,
//                 transversal: 0.134,
//             },
//             {
//                 order: 20,
//                 vertical: 3.149,
//                 transversal: 0.107,
//             },
//             {
//                 order: 21,
//                 vertical: 2.954,
//                 transversal: 0.084,
//             },
//             {
//                 order: 22,
//                 vertical: 2.748,
//                 transversal: 0.065,
//             },
//             {
//                 order: 23,
//                 vertical: 2.531,
//                 transversal: 0.049,
//             },
//             {
//                 order: 24,
//                 vertical: 2.305,
//                 transversal: 0.036,
//             },
//             {
//                 order: 25,
//                 vertical: 2.07,
//                 transversal: 0.025,
//             },
//             {
//                 order: 26,
//                 vertical: 1.579,
//                 transversal: 0.011,
//             },
//             {
//                 order: 27,
//                 vertical: 1.065,
//                 transversal: 0.003,
//             },
//             {
//                 order: 28,
//                 vertical: 0.537,
//                 transversal: 0.0,
//             },
//             {
//                 order: 29,
//                 vertical: 0.0,
//                 transversal: 0.0,
//             },
//         ],
//     },
//     {
//         name: 'station_29.7',
//         longitudinal: 29.7,
//         order: 2,
//         coordinates: [
//             {
//                 order: 0,
//                 vertical: 5.0,
//                 transversal: 3.0,
//             },
//             {
//                 order: 1,
//                 vertical: 4.997,
//                 transversal: 2.5,
//             },
//             {
//                 order: 2,
//                 vertical: 4.98,
//                 transversal: 2.0,
//             },
//             {
//                 order: 3,
//                 vertical: 4.837,
//                 transversal: 1.592,
//             },
//             {
//                 order: 4,
//                 vertical: 4.758,
//                 transversal: 1.372,
//             },
//             {
//                 order: 5,
//                 vertical: 4.645,
//                 transversal: 1.07,
//             },
//             {
//                 order: 6,
//                 vertical: 4.59,
//                 transversal: 0.941,
//             },
//             {
//                 order: 7,
//                 vertical: 4.522,
//                 transversal: 0.809,
//             },
//             {
//                 order: 8,
//                 vertical: 4.481,
//                 transversal: 0.744,
//             },
//             {
//                 order: 9,
//                 vertical: 4.434,
//                 transversal: 0.68,
//             },
//             {
//                 order: 10,
//                 vertical: 4.38,
//                 transversal: 0.617,
//             },
//             {
//                 order: 11,
//                 vertical: 4.318,
//                 transversal: 0.555,
//             },
//             {
//                 order: 12,
//                 vertical: 4.248,
//                 transversal: 0.495,
//             },
//             {
//                 order: 13,
//                 vertical: 4.168,
//                 transversal: 0.438,
//             },
//             {
//                 order: 14,
//                 vertical: 4.078,
//                 transversal: 0.383,
//             },
//             {
//                 order: 15,
//                 vertical: 3.977,
//                 transversal: 0.332,
//             },
//             {
//                 order: 16,
//                 vertical: 3.864,
//                 transversal: 0.284,
//             },
//             {
//                 order: 17,
//                 vertical: 3.738,
//                 transversal: 0.24,
//             },
//             {
//                 order: 18,
//                 vertical: 3.598,
//                 transversal: 0.2,
//             },
//             {
//                 order: 19,
//                 vertical: 3.444,
//                 transversal: 0.165,
//             },
//             {
//                 order: 20,
//                 vertical: 3.276,
//                 transversal: 0.134,
//             },
//             {
//                 order: 21,
//                 vertical: 3.095,
//                 transversal: 0.107,
//             },
//             {
//                 order: 22,
//                 vertical: 2.903,
//                 transversal: 0.084,
//             },
//             {
//                 order: 23,
//                 vertical: 2.7,
//                 transversal: 0.065,
//             },
//             {
//                 order: 24,
//                 vertical: 2.486,
//                 transversal: 0.049,
//             },
//             {
//                 order: 25,
//                 vertical: 2.263,
//                 transversal: 0.036,
//             },
//             {
//                 order: 26,
//                 vertical: 2.033,
//                 transversal: 0.025,
//             },
//             {
//                 order: 27,
//                 vertical: 1.55,
//                 transversal: 0.011,
//             },
//             {
//                 order: 28,
//                 vertical: 1.046,
//                 transversal: 0.003,
//             },
//             {
//                 order: 29,
//                 vertical: 0.526,
//                 transversal: 0.0,
//             },
//             {
//                 order: 30,
//                 vertical: 0.0,
//                 transversal: 0.0,
//             },
//         ],
//     },

//     {
//         name: 'station_30.8',
//         longitudinal: 30.8,
//         order: 3,
//         coordinates: [
//             {
//                 order: 0,
//                 vertical: 5.0,
//                 transversal: 3.0,
//             },
//             {
//                 order: 1,
//                 vertical: 4.998,
//                 transversal: 2.75,
//             },
//             {
//                 order: 2,
//                 vertical: 4.991,
//                 transversal: 2.5,
//             },
//             {
//                 order: 3,
//                 vertical: 4.976,
//                 transversal: 2.25,
//             },
//             {
//                 order: 4,
//                 vertical: 4.955,
//                 transversal: 2.0,
//             },
//             {
//                 order: 5,
//                 vertical: 4.802,
//                 transversal: 1.592,
//             },
//             {
//                 order: 6,
//                 vertical: 4.716,
//                 transversal: 1.372,
//             },
//             {
//                 order: 7,
//                 vertical: 4.591,
//                 transversal: 1.07,
//             },
//             {
//                 order: 8,
//                 vertical: 4.53,
//                 transversal: 0.941,
//             },
//             {
//                 order: 9,
//                 vertical: 4.456,
//                 transversal: 0.809,
//             },
//             {
//                 order: 10,
//                 vertical: 4.412,
//                 transversal: 0.744,
//             },
//             {
//                 order: 11,
//                 vertical: 4.362,
//                 transversal: 0.68,
//             },
//             {
//                 order: 12,
//                 vertical: 4.306,
//                 transversal: 0.617,
//             },
//             {
//                 order: 13,
//                 vertical: 4.242,
//                 transversal: 0.555,
//             },
//             {
//                 order: 14,
//                 vertical: 4.169,
//                 transversal: 0.495,
//             },
//             {
//                 order: 15,
//                 vertical: 4.088,
//                 transversal: 0.438,
//             },
//             {
//                 order: 16,
//                 vertical: 3.997,
//                 transversal: 0.383,
//             },
//             {
//                 order: 17,
//                 vertical: 3.895,
//                 transversal: 0.332,
//             },
//             {
//                 order: 18,
//                 vertical: 3.781,
//                 transversal: 0.284,
//             },
//             {
//                 order: 19,
//                 vertical: 3.656,
//                 transversal: 0.24,
//             },
//             {
//                 order: 20,
//                 vertical: 3.517,
//                 transversal: 0.2,
//             },
//             {
//                 order: 21,
//                 vertical: 3.364,
//                 transversal: 0.165,
//             },
//             {
//                 order: 22,
//                 vertical: 3.199,
//                 transversal: 0.134,
//             },
//             {
//                 order: 23,
//                 vertical: 3.021,
//                 transversal: 0.107,
//             },
//             {
//                 order: 24,
//                 vertical: 2.832,
//                 transversal: 0.084,
//             },
//             {
//                 order: 25,
//                 vertical: 2.633,
//                 transversal: 0.065,
//             },
//             {
//                 order: 26,
//                 vertical: 2.424,
//                 transversal: 0.049,
//             },
//             {
//                 order: 27,
//                 vertical: 2.206,
//                 transversal: 0.036,
//             },
//             {
//                 order: 28,
//                 vertical: 1.981,
//                 transversal: 0.025,
//             },
//             {
//                 order: 29,
//                 vertical: 1.51,
//                 transversal: 0.011,
//             },
//             {
//                 order: 30,
//                 vertical: 1.018,
//                 transversal: 0.003,
//             },
//             {
//                 order: 31,
//                 vertical: 0.513,
//                 transversal: 0.0,
//             },
//             {
//                 order: 32,
//                 vertical: 0.0,
//                 transversal: 0.0,
//             },
//         ],
//     },
// ];
