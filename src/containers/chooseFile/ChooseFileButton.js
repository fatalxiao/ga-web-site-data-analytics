/**
 * @file ChooseFileButton.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Component} from 'react';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Styles
import 'scss/containers/chooseFile/ChooseFileButton.scss';

class ChooseFileButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RaisedButton className="choose-file-button"
                          value="Choose File"/>
        );
    }

}

export default ChooseFileButton;
