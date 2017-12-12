import React from "react";
import classnames from "classnames";
import {connect} from "dva";

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
        }
    }
    change(k,v){
        this.setState({
            ...this.state,
            [k]:v
        })
    }
    render() {
        return <div className="add">
            <div className="top">写下你的留言</div>
            <div className="title">
                <input
                    // type="text"
                    placeholder="留言标题"
                    className="addinput"
                    value={this.state.title}
                    onChange={(e)=>{this.change("title",e.target.value)}}
                />
            </div>
            <div className="title">
                <textarea
                    name="content"
                    cols="30"
                    rows="3"
                    placeholder="留言内容"
                    className="addinput area"
                    onChange={(e)=>{this.change("content",e.target.value)}}
                ></textarea>
            </div>
            <button onClick={()=>{this.props.add(this.state);alert("提交成功");this.props.show(false)}}>提交</button>
            <span onClick={()=>{this.props.show(false)}}>X</span>
        </div>
    }
}
export default connect(
    null,
    (dispatch)=>({
        add(message){
            dispatch({"type":"message/add_async",message});
        }
    })
)(Add);