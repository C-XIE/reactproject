import React from "react";

import "../../css/message.less"
import { connect } from "dva";

import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";
import Add from "./Add";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showmodel: false
        }
    }
    show(v) {
        this.setState({
            ...this.state,
            showmodel: v
        })
    }
    componentDidMount(){
        this.props.init(1,5);
        $(window).scroll(function(){
        })
    }
    render() {
        return <div className="container">
            <div className="content">
                <Leftpart  show={this.show.bind(this)}></Leftpart>
                <Rightpart></Rightpart>
            </div>
            {
                this.state.showmodel
                    ?
                    <div className="back">
                    </div>
                    :
                    null
            }
            {
                this.state.showmodel
                    ?
                    <Add show={this.show.bind(this)}></Add>
                    :
                    null
            }
        </div>
    }
}
export default connect(
    null,
    (dispatch)=>{
        return {
            init(currentpage,a){
                dispatch({"type":"message/init_async",currentpage,a})
            }
        }
    }
)(Index);