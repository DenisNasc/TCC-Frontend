import React from 'react';
import {TableRow, TableCell} from '@material-ui/core';

import type {TypeProject} from 'state/reducers/user/types';

import Actions from './Actions';

interface Props {
    rows: TypeProject[];
    page: number;
    rowsPerPage: number;
    filter: string;
}

const Body: React.FC<Props> = ({rows, page, rowsPerPage, filter}) => {
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            )
                .filter(e => e.name.includes(filter))
                .map(e => (
                    <TableRow key={e.id} hover>
                        <TableCell align="center">{e.name}</TableCell>
                        <TableCell align="center">{e.engineer}</TableCell>
                        <TableCell align="center">{e.shipyard}</TableCell>
                        <TableCell align="center">{e.updatedAt}</TableCell>
                        <TableCell align="center">{e.createdAt}</TableCell>
                        <TableCell align="center">
                            <Actions id={e.id} />
                        </TableCell>
                    </TableRow>
                ))}

            {emptyRows > 0 && (
                <TableRow style={{height: 81 * emptyRows}}>
                    <TableCell colSpan={7} />
                </TableRow>
            )}
        </>
    );
};

export default Body;
