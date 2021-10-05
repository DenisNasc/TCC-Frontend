import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import CardItem from 'components/project/CardItem';

import useReduxStore from 'hooks/useReduxStore';
import useGetStations from './hooks/useGetStationsCoordinates';

const cardsList = [
    {
        title: 'TABELA DE COTAS',
        description:
            "A descriminação matemática da embarcação, a partir da interseção das curvas de referência: balizas, linhas do alto, linhas d'água",
        pathRedirect: 'tabela-cotas',
    },
    {
        title: 'CURVAS HIDROSTÁTICAS',
        description:
            'Características da embarcação quando submersa na água, conforme as determinações da NORMAM/DPC',
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
        <Grid container justifyContent="center" alignItems="flex-start">
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
        </Grid>
    );
};

export default DisplayAreas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
    })
);
