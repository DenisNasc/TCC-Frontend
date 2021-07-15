import React from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {Delete as IconDelete, Edit as IconEdit} from '@material-ui/icons';

interface Props {
    id: string;
}

const ActionsColumn: React.FC<Props> = ({id}) => {
    const classes = useStyles();
    const history = useHistory();
    const deleteProject = (projectId: string) => {
        console.log('delete', projectId);
        // DELETER O PROJETO NO BANCO DE DADOS
        // RECEBER A NOVA LISTA DE PROJETOS DO BANCO DE DADOS
        // ENVIAR A NOVA LISTA DE PROJETOS PRO REDUCER USER
    };

    const editProject = (projectId: string) => {
        history.push(`/projects/${projectId}`);
    };

    return (
        <div className={classes.actions}>
            <IconButton className={classes.deleteButton} onClick={() => deleteProject(id)}>
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
