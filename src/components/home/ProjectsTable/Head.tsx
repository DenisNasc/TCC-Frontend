import React from 'react';
import {TableHead, TableRow, TableCell} from '@material-ui/core';

interface Column {
    id: 'id' | 'project' | 'engineer' | 'shipyard' | 'updatedAt' | 'createdAt' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {id: 'id', label: 'ID', minWidth: 170, align: 'center'},
    {id: 'project', label: 'Project', minWidth: 100, align: 'center'},
    {
        id: 'engineer',
        label: 'Engineer',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'shipyard',
        label: 'Shipyard',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'updatedAt',
        label: 'Updated At',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'center',
    },
];

const Head: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default Head;
