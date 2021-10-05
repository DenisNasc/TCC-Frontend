import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {TableHead, TableRow, TableCell} from '@material-ui/core';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
    backgroundColor: string;
}

const columns: Column[] = [
    {id: 'project', label: 'Projeto', minWidth: 100, align: 'center', backgroundColor: '#FFECB3'},
    {
        id: 'engineer',
        label: 'Engenheiro',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#FFECB3',
    },
    {
        id: 'shipyard',
        label: 'Estaleiro',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#FFECB3',
    },
    {
        id: 'lengthOverall',
        label: 'Comp. Total',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#BBDEFB',
    },

    {
        id: 'breadth',
        label: 'Boca',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#BBDEFB',
    },
    {
        id: 'depth',
        label: 'Pontal',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#BBDEFB',
    },
    {
        id: 'updatedAt',
        label: 'Atualizado',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#B2DFDB',
    },
    {
        id: 'createdAt',
        label: 'Criado',
        minWidth: 100,
        align: 'center',
        backgroundColor: '#B2DFDB',
    },
    {
        id: 'access',
        label: 'Acessar',
        minWidth: 60,
        align: 'center',
        backgroundColor: '#CFD8DC',
    },

    {
        id: 'edit',
        label: 'Editar',
        minWidth: 60,
        align: 'center',
        backgroundColor: '#CFD8DC',
    },
    {
        id: 'delete',
        label: 'Excluir',
        minWidth: 60,
        align: 'center',
        backgroundColor: '#CFD8DC',
    },
];

const Head: React.FC = () => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    colSpan={3}
                    align="center"
                    style={{background: '#FFE082'}}
                    classes={{root: classes.root}}
                >
                    GERENCIAMENTO
                </TableCell>
                <TableCell
                    colSpan={3}
                    align="center"
                    style={{background: '#90CAF9'}}
                    classes={{root: classes.root}}
                >
                    DIMENSÕES
                </TableCell>
                <TableCell
                    colSpan={2}
                    align="center"
                    style={{background: '#80CBC4'}}
                    classes={{root: classes.root}}
                >
                    DATAS
                </TableCell>
                <TableCell
                    colSpan={3}
                    align="center"
                    style={{background: '#B0BEC5'}}
                    classes={{root: classes.root}}
                >
                    AÇÕES
                </TableCell>
            </TableRow>
            <TableRow>
                {columns.map(column => (
                    <TableCell
                        classes={{root: classes.root}}
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth, backgroundColor: column.backgroundColor}}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default Head;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: theme.typography.fontSize * 1.2,
            fontWeight: 'bold',
        },
    })
);
