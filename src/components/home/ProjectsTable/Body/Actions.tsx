import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {Delete as IconDelete, Edit as IconEdit} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';
import {axiosDevInstance} from 'axiosInstances';
import {USER_UPDATE_PROJECTS} from 'state/actions/user';

interface Props {
    id: string;
}

const ActionsColumn: React.FC<Props> = ({id}) => {
    const dispatch = useDispatch();
    const {
        user: {id: userID, token},
    } = useReduxStore();

    const [deleteFetchStates, setDeleteFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();
    const history = useHistory();

    const {start} = deleteFetchStates;
    const axiosDev = axiosDevInstance(token);

    const handleDeleteProject = useCallback(() => {
        setDeleteFetchStates({start: true, success: false, fail: false});
    }, []);

    const editProject = (projectId: string) => {
        history.push(`/projects/${projectId}`);
    };

    useEffect(() => {
        if (!start) return;
        const deleteProject = async () => {
            try {
                await axiosDev.delete(`/users/${userID}/projects/${id}`);
                const {data: projects} = await axiosDevInstance(token).get(
                    `/users/${userID}/projects`
                );

                const payload = {projects};

                dispatch({type: USER_UPDATE_PROJECTS, payload});

                setDeleteFetchStates({start: false, success: true, fail: false});
            } catch (error) {
                console.log(error.message);
                setDeleteFetchStates({start: false, success: false, fail: true});
            }
        };

        deleteProject();
    }, [start]);

    return (
        <div className={classes.actions}>
            <IconButton className={classes.deleteButton} onClick={handleDeleteProject}>
                <IconDelete />
            </IconButton>

            <IconButton className={classes.editButton} onClick={() => editProject(id)}>
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
