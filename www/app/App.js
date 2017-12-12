import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import Index from "./childrenComponents/findComponent/Index";



class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {/* <Index nav={this.state.nav}></Index> */}
        </div>
    }
}
export default connect()(App);

//App.js 没有使用到
