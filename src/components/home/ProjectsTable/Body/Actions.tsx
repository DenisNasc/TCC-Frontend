import React, {useCallback, useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {Delete as IconDelete, Edit as IconEdit} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';

import useDeleteProject from './hooks/useDeleteProject';
import useEditProject from './hooks/useEditProject';

interface Props {
    id: string;
    name: string;
}

const ActionsColumn: React.FC<Props> = ({id, name}) => {
    const {
        user: {id: userID},
    } = useReduxStore();

    const [deleteFetchStates, setDeleteFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const [editFetchStates, setEditFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();

    const handleDeleteProject = useCallback(() => {
        setDeleteFetchStates({start: true, success: false, fail: false});
    }, []);

    const handleEditProject = useCallback(() => {
        setEditFetchStates({start: true, success: false, fail: false});
    }, []);

    useDeleteProject({userID, projectID: id}, deleteFetchStates, setDeleteFetchStates);
    useEditProject({userID, projectName: name, projectID: id}, editFetchStates, setEditFetchStates);

    return (
        <div className={classes.actions}>
            <IconButton className={classes.deleteButton} onClick={handleDeleteProject}>
                <IconDelete />
            </IconButton>

            <IconButton className={classes.editButton} onClick={handleEditProject}>
                <IconEdit />
            </IconButton>
        </div>
    );
};

export default ActionsColumn;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {display: 'flex', justifyContent: 'space-around'},
        deleteButton: {
            color: theme.palette.error.main,
        },
        editButton: {
            color: theme.palette.grey.A100,
        },
    })
);
