/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Component} from 'react';

// Components
import ChooseFileButton from 'containers/chooseFile/ChooseFileButton';

// Styles
import 'scss/containers/Root.scss';

class Root extends Component {

    constructor(props) {

        super(props);

        this.state = {
            file: null
        };

    }

    render() {

        const {file} = this.state;

        return (
            <div className="root">
                {
                    file ?
                        <table></table>
                        :
                        <ChooseFileButton/>
                }
            </div>
        );

    }

}

export default Root;
