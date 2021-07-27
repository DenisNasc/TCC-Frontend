import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import useReduxStore from 'hooks/useReduxStore';

import {axiosDevInstance} from 'fetch/axiosInstances';

import DefaultTemplate from 'styles/templates';
import CardItem from 'components/project/CardItem';

import {CURRENT_PROJECT_UPDATE} from 'state/actions/projects';

import type {ResponseStations} from 'types/fetch/stations';
import type {ResponseCoordinates} from 'types/fetch/coordinates';

const cardsList = [
    {
        title: 'Tabela de Cotas',
        description: 'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'tabela-cotas',
    },
    {
        title: 'Arranjo Geral',
        description: 'O desenho detalhado de todos os componentes da embarcação, conforme as determinações da NORMAM/DPC',
        important: true,
        pathRedirect: 'arranjo-geral',
    },
    {
        title: 'Plano de Linhas',
        description: 'As seções nos 3 planos espaciais do casco da embarcação, conforme as determinações da NORMAM/DPC',
        important: true,
        pathRedirect: 'plano-linhas',
    },

    {
        title: 'Plano de Pintura',
        description: 'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'plano-pintura',
    },
    {
        title: 'Cronograma Físico-Financeiro',
        description: 'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'cronograma',
    },
];

const Project: React.FC = () => {
    const dispatch = useDispatch();
    const {
        user: {id: userID},
        currentProject: {id: projectID, name},
    } = useReduxStore();

    const classes = useStyles();

    const axiosDev = axiosDevInstance();

    useEffect(() => {
        const getStationsData = async () => {
            const {
                data: {stations},
            } = await axiosDev.get<ResponseStations>(`/users/${userID}/projects/${projectID}/stations`);

            const formatedStationsPromises = stations.map(async station => {
                const {id} = station;

                const {
                    data: {coordinates},
                } = await axiosDev.get<ResponseCoordinates>(`/users/${userID}/projects/${projectID}/stations/${id}/coordinates`);

                const formatedStation = {...station, coordinates};
                return formatedStation;
            });

            const formatedStations = await Promise.all(formatedStationsPromises);

            const payload = {stations: formatedStations};
            dispatch({type: CURRENT_PROJECT_UPDATE, payload});
        };

        getStationsData();
    }, [userID, projectID]);

    return (
        <DefaultTemplate title="projects">
            <Box className={classes.box}>
                {cardsList.length ? cardsList.map(e => <CardItem title={e.title} description={e.description} important={e.important} pathRedirect={e.pathRedirect} projectID={name} />) : <div>OI</div>}

                <CardItem title="Outros" description="Para acrescentar outros arquivos ao seu projeto, crie-os aqui" important pathRedirect="outros" projectID={name} />
            </Box>
        </DefaultTemplate>
    );
};

export default Project;

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
