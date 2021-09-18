import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Button, Modal, Paper, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Add as IconAdd} from '@material-ui/icons';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';

import type {ParamsPostProjects} from 'types/fetch/projects';

import useCreateProject from './hooks/useCreateProject';

export const projectParamsInitialState: ParamsPostProjects = {
    name: '',
    breadth: 0,
    draft: 0,
    depth: 0,
    lengthOverall: 0,
    lengthPerpendiculars: 0,
};

const CreateProject: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [projectParams, setProjectParams] = useState<ParamsPostProjects>(
        projectParamsInitialState
    );
    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});

    const {
        user: {id: userID},
    } = useReduxStore();

    const classes = useStyles({height: 450, width: 800});

    const {start} = fetchStates;

    const openModal = useCallback(() => {
        setProjectParams(projectParamsInitialState);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setProjectParams(projectParamsInitialState);
        setIsOpen(false);
    }, []);

    const handleCreateProject = useCallback((event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        setFetchStates({start: true, success: false, fail: false});
        setIsOpen(false);
    }, []);

    useCreateProject({userID, ...projectParams}, fetchStates, setFetchStates, setProjectParams);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<IconAdd />}
                onClick={openModal}
                className={classes.button}
                disabled={isOpen}
            >
                Novo Projeto
            </Button>

            <Modal open={isOpen} onClose={closeModal}>
                <Paper
                    square
                    className={classes.paper}
                    component="form"
                    onSubmit={handleCreateProject}
                >
                    <Box className={classes.boxContainer}>
                        <Box className={classes.boxColumn}>
                            <Typography>Informações Gerais</Typography>
                            <FormInput
                                id="name"
                                label="Nome do projeto"
                                type=""
                                values={projectParams}
                                setValue={setProjectParams}
                                required
                            />
                            <FormInput
                                id="engineer"
                                label="Engenheiro responsável"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="shipyard"
                                label="Estaleiro construtor"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                        </Box>

                        <Box className={classes.boxColumn}>
                            <Typography>Dados Técnicos</Typography>
                            <FormInput
                                id="lengthOverall"
                                label="Comprimento Total"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="lengthPerpendiculars"
                                label="Comprimento entre PP"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="breadth"
                                label="Boca Moldada"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="depth"
                                label="Pontal"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="draft"
                                label="Calado de Projeto"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                        </Box>
                    </Box>

                    <Box className={classes.buttonsBox}>
                        <Button disabled={start} type="submit">
                            Criar
                        </Button>

                        <Button disabled={start} onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default CreateProject;

const useStyles = makeStyles((theme: Theme) =>
    createStyles<string, {height: number; width: number}>({
        button: {height: '48px'},
        paper: {
            padding: theme.spacing(2),
            position: 'absolute',
            height: ({height}) => `${height}px`,
            width: ({width}) => `${width}px`,
            top: ({height}) => `calc(50vh - ${height / 2}px)`,
            left: ({width}) => `calc(50vw - ${width / 2}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        boxContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        boxColumn: {
            height: '100%',
            minWidth: '300px',
            padding: `0px ${theme.spacing(2)}px`,
            maxWidth: '500px',
        },
        buttonsBox: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
);
