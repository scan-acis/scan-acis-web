///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import StemMenu from '../StemMenu'

// Components
import MenuPopover from '../MenuPopover'

//import scanstn from '../../../assets/scan-station.png'

// Styles
//import '../../../styles/StemResources.css';

const styles = theme => ({
  root: {
    //flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    marginTop: -10,
    //[theme.breakpoints.up('md')]: {
    //  display: 'none',
    //},
  },
  control: {
    padding: theme.spacing(2),
  },
});

//var app;

@inject('store') @observer
class Resources extends Component {

    //constructor(props) {
    //    super(props);
    //    app = this.props.store.app;
    //}

    render() {

        const { classes } = this.props;

        return (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" className={classes.root} spacing={4}>
            <Grid item container justify="flex-start" alignItems="flex-start" direction="row" xs={2} md={3}>
              <Grid item>
                <Hidden mdUp>
                  <MenuPopover/>
                </Hidden>
                <Hidden smDown>
                  <StemMenu/>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item container direction="column" className={classes.root} spacing={4} xs={10} md={9}>
              <Grid item>
                <Typography variant="h5">
                  Resources
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" gutterBottom="true">
                  <a href="https://www.noaa.gov/office-education/grants/noaa-assets#weather" target="_blank" rel="noopener noreferrer">National Oceanic and Atmospheric Administration Education Resources</a>
                </Typography>
                <Typography variant="body1" gutterBottom="true">
                  <a href="https://www.nsf.gov/funding/programs.jsp?org=EHR" target="_blank" rel="noopener noreferrer">National Science Foundation Education Resources</a>
                </Typography>
                <Typography variant="body1" gutterBottom="true">
                  <a href="https://www.climatehubs.usda.gov/tools/all" target="_blank" rel="noopener noreferrer">USDA Climate Hub Tools</a>
                </Typography>
                <Typography variant="body1" gutterBottom="true">
                  <a href="https://www.weather.gov/jetstream/" target="_blank" rel="noopener noreferrer">National Weather Service - Jetstream - Online Weather School</a>
                </Typography>
                <Typography variant="body1" gutterBottom="true">
                  <a href="https://worldwind.arc.nasa.gov/worldweather/" target="_blank" rel="noopener noreferrer">NASA World Weather</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        );
    }
}

Resources.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resources);
