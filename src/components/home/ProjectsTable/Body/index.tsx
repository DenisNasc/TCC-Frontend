import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {TableRow, TableCell} from '@material-ui/core';

import type {TypeProject} from 'state/reducers/user/types';

import Actions from './Actions';

interface Props {
    rows: TypeProject[];
    page: number;
    rowsPerPage: number;
    filter: string;
}

const formatTime = (time = '') => {
    const timeFormated = time.split('-')[0];
    return timeFormated || '-';
};

const Body: React.FC<Props> = ({rows, page, rowsPerPage, filter}) => {
    const classes = useStyles();

    return (
        <>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            )
                .filter(e => e.name.includes(filter))
                .map(e => (
                    <TableRow classes={{root: classes.root}} key={e.id} hover>
                        <TableCell align="center" style={{backgroundColor: '#FFF8E1'}}>
                            {e.name}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#FFF8E1'}}>
                            {e.engineer}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#FFF8E1'}}>
                            {e.shipyard}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#E3F2FD'}}>
                            {`${e.lengthOverall} m`}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#E3F2FD'}}>
                            {`${e.breadth} m`}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#E3F2FD'}}>
                            {`${e.draft} m`}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#E0F2F1'}}>
                            {formatTime(e.updatedAt)}
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#E0F2F1'}}>
                            {formatTime(e.createdAt)}
                        </TableCell>

                        <Actions id={e.id} name={e.name} />
                    </TableRow>
                ))}
        </>
    );
};

export default Body;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
);
