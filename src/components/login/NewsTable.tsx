import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';

const createData = (date: string, name: string, description: string) => ({date, name, description});

const newsRows = [
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
    createData(
        '21/09/2021',
        'Melhoria na interface gráfica',
        'A interface gráfica do não sei oque foi aprimorada'
    ),
];

const NewsTable: React.FC = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className={classes.tableCellHeader}>
                            DATA
                        </TableCell>
                        <TableCell align="center" className={classes.tableCellHeader}>
                            NOVIDADE
                        </TableCell>
                        <TableCell align="center" className={classes.tableCellHeader}>
                            DESCRIÇÃO
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newsRows.map(({date, name, description}) => (
                        <TableRow key={name}>
                            <TableCell align="center" classes={{root: classes.tableCellRoot}}>
                                {date}
                            </TableCell>
                            <TableCell align="center" classes={{root: classes.tableCellRoot}}>
                                {name}
                            </TableCell>
                            <TableCell align="center" classes={{root: classes.tableCellRoot}}>
                                {description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NewsTable;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            maxWidth: '800px',
            maxHeight: '430px',
            marginTop: theme.spacing(2),
            overflowY: 'auto',
        },

        tableCellRoot: {
            backgroundColor: theme.palette.background.default,
        },

        tableCellHeader: {fontWeight: 'bold', fontSize: theme.typography.fontSize * 1.2},
    })
);
