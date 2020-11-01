import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Land extends Component {
    render() {
        return (
            <div>
                <Link to="/signup">Link to Signup</Link>
            </div>
        );
    }
}

export default Land;