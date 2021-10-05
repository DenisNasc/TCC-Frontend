import React, {useCallback, useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {TableCell, IconButton} from '@material-ui/core';
import {Launch as LaunchIcon, Edit as IconEdit, Delete as IconDelete} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';

import useDeleteProject from './hooks/useDeleteProject';
import useAccessProject from './hooks/useAccessProject';

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

    const [access, setAccess] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();

    const handleAccessProject = useCallback(() => {
        setAccess({start: true, success: false, fail: false});
    }, []);

    const handleEditProject = useCallback(() => {}, []);

    const handleDeleteProject = useCallback(() => {
        setDeleteFetchStates({start: true, success: false, fail: false});
    }, []);

    useDeleteProject({userID, projectID: id}, deleteFetchStates, setDeleteFetchStates);
    useAccessProject({userID, projectName: name, projectID: id}, access, setAccess);

    return (
        <>
            <TableCell align="center" className={classes.actionButton}>
                <IconButton onClick={handleAccessProject}>
                    <LaunchIcon />
                </IconButton>
            </TableCell>
            <TableCell align="center" className={classes.actionButton}>
                <IconButton onClick={handleEditProject}>
                    <IconEdit />
                </IconButton>
            </TableCell>
            <TableCell align="center" className={classes.actionButton}>
                <IconButton onClick={handleDeleteProject}>
                    <IconDelete />
                </IconButton>
            </TableCell>
        </>
    );
};

export default ActionsColumn;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionButton: {
            backgroundColor: '#ECEFF1',
        },
    })
);
