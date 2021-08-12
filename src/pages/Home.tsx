import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import DefaultTemplate from 'styles/templates';

import useReduxStore from 'hooks/useReduxStore';

import SearchFIeld from 'components/home/SearchFIeld';
import CreateNewProject from 'components/home/CreateProject';
import ProjectsTable from 'components/home/ProjectsTable';

const Home: React.FC = () => {
    const classes = useStyles();
    const {
        user: {projects},
    } = useReduxStore();

    return (
        <DefaultTemplate title="home">
            <>
                <Box className={classes.box}>
                    <SearchFIeld />

                    <CreateNewProject />
                </Box>
                <ProjectsTable rows={projects} />
            </>
        </DefaultTemplate>
    );
};

export default Home;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {display: 'flex', justifyContent: 'space-between'},
        gridContainer: {
            height: `calc(100vh - 60px)`,
        },
        grid1: {
            height: '100%',
            minHeight: '0px',
        },

        grid2: {
            padding: theme.spacing(3),
            height: '100%',
        },
        table: {},
    })
);
