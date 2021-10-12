import React from 'react';

import {styled} from '@mui/material/styles';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

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
    return (
        <TableRoot size="small">
            <TableHead>
                <TableRow>
                    <CellHeader align="center">DATA</CellHeader>
                    <CellHeader align="center">VERSÃO</CellHeader>
                    <CellHeader align="center">NOVIDADES</CellHeader>
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
        </TableRoot>
    );
};

export default NewsTable;

const TableRoot = styled(Table)(({theme}) => ({
    maxWidth: '800px',
    maxHeight: '430px',
    marginTop: theme.spacing(2),
    overflowY: 'auto',
    overflowX: 'auto',
}));

const CellHeader = styled(TableCell)(({theme}) => ({
    fontWeight: 'bold',
}));
