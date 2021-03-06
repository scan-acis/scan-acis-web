import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
//import ExtremeSwitch from '../ExtremeSwitch'
//import VarPicker from '../VarPicker'
import UnitsTempSelect from '../UnitsTempSelect'
import UnitsPrcpSelect from '../UnitsPrcpSelect'
//import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  typography: {
    margin: theme.spacing(2),
  },
  buttonTest: {
    marginTop: 26,
    marginRight: 40,
  },
});

class UnitsPopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="outlined"
          color="primary"
          className={classes.buttonTest}
          onClick={this.handleClick}
        >
          Select Units
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
            <UnitsTempSelect />
            <UnitsPrcpSelect/>
          </Box>
        </Popover>
      </div>
    );
  }
}

UnitsPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnitsPopover);
