/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import SelectFile from 'containers/selectFile/SelectFile';
import App from 'containers/app/App';

// Styles
import 'scss/containers/Root.scss';

const Root = ({data}) => (
    <div className="root">
        {
            data ?
                <App data={data}/>
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
