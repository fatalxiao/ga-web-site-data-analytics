/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../reduxes/actions';

// Components
import Toaster from 'alcedo-ui/Toaster';
import SelectFile from 'containers/selectFile/SelectFile';
import App from 'containers/app/App';

// Styles
import './Root.scss';

const Root = ({
    data, toastes,
    clearToastes
}) => (
    <div className="root">

        <Toaster toasts={toastes}
                 position={Toaster.Position.TOP}
                 onToastPop={clearToastes}/>

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
    }),

    toastes: PropTypes.array,
    clearToastes: PropTypes.func

};

export default connect(state => ({
    data: state.file.data,
    toastes: state.toaster.toastes
}), dispatch => bindActionCreators({
    clearToastes: actions.clearToastes
}, dispatch))(Root);
