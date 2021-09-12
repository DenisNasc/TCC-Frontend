import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';
import CardItem from 'components/project/CardItem';

import useReduxStore from 'hooks/useReduxStore';
import useGetStations from './hooks/useGetStationsCoordinates';

const cardsList = [
    {
        title: 'Tabela de Cotas',
        description:
            'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        pathRedirect: 'tabela-cotas',
    },
    {
        title: 'Curvas Hidrostáticas',
        description:
            'O desenho detalhado de todos os componentes da embarcação, conforme as determinações da NORMAM/DPC',
        pathRedirect: 'curvas-hidrostaticas',
    },
];

const DisplayAreas: React.FC = () => {
    const {
        user: {id: userID},
        currentProject: {id: projectID, name},
    } = useReduxStore();

    const classes = useStyles();

    useGetStations({userID, projectID});

    return (
        <Box className={classes.box}>
            {cardsList.length ? (
                cardsList.map(e => (
                    <CardItem
                        key={e.title}
                        title={e.title}
                        description={e.description}
                        pathRedirect={e.pathRedirect}
                        projectName={name}
                    />
                ))
            ) : (
                <div>OI</div>
            )}
        </Box>
    );
};

export default DisplayAreas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
    })
);
