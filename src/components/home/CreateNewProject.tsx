import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

import {USER_CREATE_PROJECT} from 'state/actions/user';

const CreateNewProject: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const createNewProject = useCallback(() => {
        const payload = {
            id: '',
            project: '',
            engineer: '',
            shipyard: '',
            updatedAt: '',
            createdAt: '',
        };
        dispatch({type: USER_CREATE_PROJECT, payload});
    }, [dispatch]);

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<IconAdd />}
            onClick={createNewProject}
            className={classes.button}
        >
            Novo Projeto
        </Button>
    );
};

export default CreateNewProject;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {height: '48px'},
    })
);
