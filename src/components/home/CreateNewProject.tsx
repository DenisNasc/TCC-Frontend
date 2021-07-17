import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Button, Modal, Paper, Typography, TextField} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';

import {axiosDevInstance} from 'axiosInstances';
import {USER_UPDATE_PROJECTS} from 'state/actions/user';

const CreateNewProject: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});

    const {
        user: {token, id},
    } = useReduxStore();

    const axiosDev = axiosDevInstance(token);
    const classes = useStyles({height: 300, width: 300});

    const {start} = fetchStates;

    useEffect(() => {
        if (!start) return;

        const createNewProject = async () => {
            try {
                await axiosDev.post(`/users/${id}/projects`, {name: projectName});

                const {data: projects} = await axiosDev.get(`/users/${id}/projects`);

                const payload = {projects};
                dispatch({type: USER_UPDATE_PROJECTS, payload});

                setFetchStates({start: false, success: true, fail: false});
                closeModal();
            } catch (error) {
                setFetchStates({start: false, success: false, fail: true});
                console.log(error.message);
            }
        };

        createNewProject();
    }, [start]);

    const handleProjectNameChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setProjectName(e.target.value);
        },
        []
    );

    const handleCreateNewProject = useCallback(() => {
        setFetchStates({start: true, success: false, fail: false});
    }, []);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setProjectName('');
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
                <Paper square className={classes.paper}>
                    <Typography>Criar Novo Projeto</Typography>
                    <TextField value={projectName} onChange={handleProjectNameChange} autoFocus />
                    <Box className={classes.buttonsBox}>
                        <Button disabled={start} onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button disabled={start} onClick={handleCreateNewProject}>
                            Criar
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default CreateNewProject;

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
