import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@material-ui/core';

const createData = (date: string, name: string, description: string, version: string) => ({
    date,
    version,
    name,
    description,
});

const newsRows = [
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
    createData('29/09/2021', 'Exemplo de novidade', 'Exemplo de descrição', 'ALFA'),
];

const NewsTable: React.FC = () => {
    const classes = useStyles();

    return (
        <Table component={Paper} elevation={3} size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell align="center" classes={{root: classes.tableCellHeader}}>
                        DATA
                    </TableCell>
                    <TableCell align="center" classes={{root: classes.tableCellHeader}}>
                        VERSÃO
                    </TableCell>
                    <TableCell align="center" classes={{root: classes.tableCellHeader}}>
                        NOVIDADES
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {newsRows.map(({date, version, name}) => (
                    <TableRow key={name}>
                        <TableCell align="center">{date}</TableCell>
                        <TableCell align="center">{version}</TableCell>
                        <TableCell align="center">{name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default NewsTable;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            maxWidth: '800px',
            maxHeight: '430px',
            marginTop: theme.spacing(2),
            overflowY: 'auto',
            overflowX: 'auto',
        },

        tableCellRoot: {},

        tableCellHeader: {fontWeight: 'bold'},
    })
);
