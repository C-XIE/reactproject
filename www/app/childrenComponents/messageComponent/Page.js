import React from "react";
import { connect } from "dva";
class Leftpart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: 1
        }
    }
    getData(currentpage) {
        if (currentpage > 0 || currentpage <= Math.ceil(this.props.count / this.props.pagesize)) {
            this.setState({
                ...this.state,
                currentpage
            })
            this.props.getdata(currentpage);
        }

    }
    render() {
        const page = Math.ceil(this.props.count / this.props.pagesize);
        return <div className="page">
            <ul>
                <li><a onClick={() => { this.getData(1) }}>第一页</a></li>
                <li><a onClick={() => { this.getData(this.state.currentpage - 1==0?1:this.state.currentpage - 1) }}>上一页</a></li>
                <li>第{this.state.currentpage}页</li>
                <li><a onClick={() => { this.getData(this.state.currentpage==page?page:this.state.currentpage+1) }}>下一页</a></li>
                <li><a onClick={() => { this.getData(page) }}>最后页</a></li>
                <li>共{page}页</li>
            </ul>
        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        getdata(currentpage) {
            dispatch({ "type": "message/init_async", currentpage })
        }
    })
)(Leftpart);