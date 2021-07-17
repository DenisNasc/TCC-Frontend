import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import useReduxStore from 'hooks/useReduxStore';

import DefaultTemplate from 'styles/templates';
import CardItem from 'components/project/CardItem';

const cardsList = [
    {
        title: 'Arranjo Geral',
        description:
            'O desenho detalhado de todos os componentes da embarcação, conforme as determinações da NORMAM/DPC',
        important: true,
        pathRedirect: 'arranjo-geral',
    },
    {
        title: 'Plano de Linhas',
        description:
            'As seções nos 3 planos espaciais do casco da embarcação, conforme as determinações da NORMAM/DPC',
        important: true,
        pathRedirect: 'plano-linhas',
    },
    {
        title: 'Tabela de Cotas',
        description:
            'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'tabela-cotas',
    },
    {
        title: 'Plano de Pintura',
        description:
            'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'plano-pintura',
    },
    {
        title: 'Cronograma Físico-Financeiro',
        description:
            'A descriminação matemática da embarcação, a partir da interseção das linhas de referência: linha de base, linha de centro, perpendicular de ré',
        important: true,
        pathRedirect: 'cronograma',
    },
];

const Project: React.FC = () => {
    const {currentProject} = useReduxStore();

    const classes = useStyles();

    const [projectState, setProjectState] = useState({...currentProject});
    const {id: projectID} = projectState;

    useEffect(() => {
        if (projectID) {
            console.log('ENVIAR AO DB E RECEBER AS INFOS');
        }
    }, [projectID]);

    return (
        <DefaultTemplate title="projects">
            <Box className={classes.box}>
                {cardsList.length ? (
                    cardsList.map(e => (
                        <CardItem
                            title={e.title}
                            description={e.description}
                            important={e.important}
                            pathRedirect={e.pathRedirect}
                            projectID={projectID}
                        />
                    ))
                ) : (
                    <div>OI</div>
                )}

                <CardItem
                    title="Outros"
                    description="Para acrescentar outros arquivos ao seu projeto, crie-os aqui"
                    important
                    pathRedirect="outros"
                    projectID={projectID}
                />
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
