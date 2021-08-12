import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Button, Modal, Paper, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Add as IconAdd} from '@material-ui/icons';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';

import type {ParamsPostProjects} from 'types/fetch/projects';

import useCreateProject from './hooks/useCreateProject';

const projectParamsInitialState: ParamsPostProjects = {name: ''};

const CreateProject: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [projectParams, setProjectParams] = useState<ParamsPostProjects>(
        projectParamsInitialState
    );
    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});

    const {
        user: {id: userID},
    } = useReduxStore();

    const classes = useStyles({height: 300, width: 300});

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
                    <Typography>Criar Novo Projeto</Typography>

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
                        type=""
                        values={projectParams}
                        setValue={setProjectParams}
                    />
                    <FormInput
                        id="shipyard"
                        label="Estaleiro construtor"
                        type=""
                        values={projectParams}
                        setValue={setProjectParams}
                    />
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
        buttonsBox: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
);
