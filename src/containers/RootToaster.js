/**
 * @file RootToaster.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../reduxes/actions';

// Components
import Toaster from 'alcedo-ui/Toaster';

// Styles
import './RootToaster.scss';

const RootToaster = ({
    toastes,
    clearToastes
}) => (
    <Toaster className="root-toaster"
             toasts={toastes}
             position={Toaster.Position.TOP}
             onToastPop={clearToastes}/>
);

RootToaster.propTypes = {
    toastes: PropTypes.array,
    clearToastes: PropTypes.func
};

export default connect(state => ({
    toastes: state.toaster.toastes
}), dispatch => bindActionCreators({
    clearToastes: actions.clearToastes
}, dispatch))(RootToaster);
