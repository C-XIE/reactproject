import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';

import Infoindex from "./infoComponent/Infoindex";
import Infoindexmoney from "./infoComponent/Infoindexmoney";

import "./css/indexpage.less";

class Index extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.dispatch({ "type": "info/init_async" })

    }
    render() {
        
        return <div className="largerindex">
            <div className="messagediv" ref="message">
                <Infoindex city={this.props.city}></Infoindex>
                <Infoindexmoney money={this.props.money}></Infoindexmoney>
            </div>
        </div>
    }
}
export default connect(
    ({ info }) => {
        return {
            city: info.city,
            money:info.money
        }
    }
)(Index);
