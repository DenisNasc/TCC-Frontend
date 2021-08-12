import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';
import CardItem from 'components/project/CardItem';

import useReduxStore from 'hooks/useReduxStore';
import useGetStations from './hooks/useGetStationsCoordinates';

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
                cardsList.map(e => <CardItem key={e.title} title={e.title} description={e.description} important={e.important} pathRedirect={e.pathRedirect} projectName={name} />)
            ) : (
                <div>OI</div>
            )}

            <CardItem title="Outros" description="Para acrescentar outros arquivos ao seu projeto, crie-os aqui" important pathRedirect="outros" projectName={name} />
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
