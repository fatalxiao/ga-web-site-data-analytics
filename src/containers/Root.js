/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import RootToaster from './RootToaster';
import SelectFile from 'containers/selectFile/SelectFile';
import App from 'containers/app/App';

// Styles
import './Root.scss';

const Root = ({
    data
}) => (
    <div className="root">

        <RootToaster/>

        {
            data ?
                <App/>
                :
                <SelectFile/>
        }

    </div>
);

Root.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default connect(state => ({
    data: state.file.data
}))(Root);
