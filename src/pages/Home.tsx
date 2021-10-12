import React from 'react';

import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';

import DefaultTemplate from 'styles/templates';

import useReduxStore from 'hooks/useReduxStore';

import SearchFIeld from 'components/home/SearchField';
import CreateNewProject from 'components/home/CreateProject';
import ProjectsTable from 'components/home/ProjectsTable';

const Home: React.FC = () => {
    const {
        user: {projects},
    } = useReduxStore();

    return (
        <DefaultTemplate title="home">
            <Grid container item>
                <GridLeft container item justifyContent="space-between" xs={12}>
                    <SearchFIeld />
                    <CreateNewProject />
                </GridLeft>

                <Grid container item xs={12}>
                    <ProjectsTable rows={projects} />
                </Grid>
            </Grid>
        </DefaultTemplate>
    );
};

export default Home;

const GridLeft = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(3),
}));
