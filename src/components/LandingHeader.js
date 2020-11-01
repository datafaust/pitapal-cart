import React, { Component } from 'react';
import classes from './landingheader.module.css';

class LandingHeader extends Component {
    render() {
        return (
            <div className={classes.header}>
                <div className={classes.title}>
                    PitaPal
                </div>
            </div>
        );
    }
}

export default LandingHeader;