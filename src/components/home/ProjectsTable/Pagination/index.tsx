import React from 'react';

import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {TablePagination} from '@material-ui/core';

import type {TypeProject} from 'state/reducers/user/types';

import TablePaginationActions from './TablePaginationsActions';

interface Props {
    rows: TypeProject[];
    rowsPerPage: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({rows, rowsPerPage, page, setRowsPerPage, setPage}) => {
    const classes = useStyles();

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            align="center"
            className={classes.pagination}
            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
            colSpan={0}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
        />
    );
};

export default Pagination;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pagination: {},
    })
);
