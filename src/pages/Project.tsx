import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import DefaultTemplate from 'styles/templates';

import DisplayAreas from 'components/project/DisplayAreas';

const Project: React.FC = () => {
    const classes = useStyles();

    return (
        <DefaultTemplate title="projects">
            <DisplayAreas />
        </DefaultTemplate>
    );
};

export default Project;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
    })
);
