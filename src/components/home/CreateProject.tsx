import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Button, Divider, Modal, Paper, Typography} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

import FormInput from 'components/shared/FormInput';

import useStore from 'hooks/useReduxStore';

import type {ParamsPostProjects} from 'types/fetch/projects';

import useCreateProject from './hooks/useCreateProject';

const CreateProject: React.FC = () => {
    const {
        user: {id: userID, name},
    } = useStore();

    const projectParamsInitialState: ParamsPostProjects = {
        breadth: null,
        draft: null,
        depth: null,
        lengthOverall: null,
        lengthPerpendiculars: null,
        shipyard: '',
        name: '',
        engineer: name,
    };

    const [isOpen, setIsOpen] = useState(false);
    const [projectParams, setProjectParams] = useState({...projectParamsInitialState});
    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});

    const classes = useStyles({height: 500, width: 800});

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
                    className={classes.paper}
                    component="form"
                    onSubmit={handleCreateProject}
                    elevation={0}
                >
                    <Typography className={classes.typography}>CRIAR NOVO PROJETO</Typography>

                    <Divider className={classes.divider} />

                    <Box className={classes.boxContainer}>
                        <Box className={classes.boxColumn}>
                            <Typography className={classes.title}>INFORMAÇÕES GERAIS</Typography>
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
                            <Typography className={classes.title}>DADOS TÉCNICOS</Typography>
                            <FormInput
                                id="lengthOverall"
                                required
                                label="Comprimento Total"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="lengthPerpendiculars"
                                required
                                label="Comprimento entre PP"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="breadth"
                                required
                                label="Boca Moldada"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="depth"
                                required
                                label="Pontal"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                            <FormInput
                                id="draft"
                                required
                                label="Calado de Projeto"
                                type="number"
                                values={projectParams}
                                setValue={setProjectParams}
                            />
                        </Box>
                    </Box>

                    <Divider className={classes.divider} />

                    <Box className={classes.buttonsBox}>
                        <Button
                            disabled={start}
                            variant="contained"
                            type="submit"
                            classes={{root: classes.buttonSubmit}}
                        >
                            Criar
                        </Button>

                        <Button
                            disabled={start}
                            variant="contained"
                            onClick={closeModal}
                            classes={{root: classes.buttonCancel}}
                        >
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
        typography: {fontWeight: 'bold', fontSize: theme.typography.fontSize * 1.5},
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
        title: {
            fontWeight: 'bold',
            fontSize: theme.typography.fontSize * 1.2,
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
        },
        divider: {
            width: '100%',
            margin: `${theme.spacing(1)}px 0px `,
        },
        buttonsBox: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: `0px ${theme.spacing(3)}px`,
        },
        buttonSubmit: {
            color: '#fff',
            background: theme.palette.success.main,
            '&:hover': {
                background: theme.palette.success.dark,
            },
            fontWeight: 'bold',
        },
        buttonCancel: {
            color: '#fff',
            background: theme.palette.error.main,
            '&:hover': {
                background: theme.palette.error.dark,
            },
            fontWeight: 'bold',
        },
    })
);
