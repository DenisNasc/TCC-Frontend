import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper, TableContainer, Table, TableBody, TableRow, TableFooter} from '@material-ui/core';

import type {TypeProject} from 'state/reducers/user/types';
import useReduxStore from 'hooks/useReduxStore';

import Head from './Head';
import Body from './Body';
import Pagination from './Pagination';

interface Props {
    rows: TypeProject[];
}

const ProjectsTable: React.FC<Props> = ({rows}) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {
        app: {filter},
    } = useReduxStore();

    console.log(rows);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <Head />
                <TableBody className={classes.tableBody}>
                    <Body filter={filter} rows={rows} page={page} rowsPerPage={rowsPerPage} />
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <Pagination
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            rows={rows}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default ProjectsTable;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            maxHeight: '600px',
            overflowY: 'auto',
        },
        tableBody: {},
    })
);
