import React from "react";
import {connect} from "dva";
import Comment from "./Comment";

class Rightpart extends React.Component {
    constructor() {
        super();
        this.state={
            changecss:false
        }
    }
    componentDidMount(){
        $(this.refs.right).sortable();
    }
    handletime(time) {
        // const arr = time.match(/(.+)T(.+)\..+/);
        // return arr[1]+" "+arr[2];
        //根据数据库存储的时间 转换为想要的格式
        let timeObj = new Date(time);
        let str = `${timeObj.getFullYear()}-${timeObj.getMonth() + 1}-${timeObj.getDate()} 星期${timeObj.getDay() == 0 ? "天" : timeObj.getDay()} ${timeObj.getHours() > 12 ? "下午" : "上午"}`
        return str;
    }
    render() {
        const {result,savearr} = this.props;
        console.log(savearr);
        return <div className="right">
            <ul className="rightpart" ref="right" style={this.state.changecss?{"position":"absolute","width": "43%","left": "106%","top":"-40px"}:null}>
                <span className="numspan">收藏了{savearr.length}条留言</span>
                <span><a onClick={()=>{this.setState({"changecss":!this.state.changecss})}}>查看留言</a></span>
                {
                    savearr.map((item, index) => {
                            return <div
                                className="item"
                                key={index}
                            >
                                <h3 className="title">{item.title}</h3>
                                <p>{item.content}</p>
                                <p className="user">来自{item.email}</p>
                                <p>来自{item.content}</p>
                                <a href="javascript:void(0)"><span>评论</span><b>{item.feedback.length}</b></a>
                                {"   "}
                                <span className="savezan">赞{item.zan}</span>
                                <a href="javascript:void(0)" onClick={()=>{this.props.save(item._id,false)}}>取消收藏</a>
                                <span className="time">{this.handletime(item.time)}</span>
                                <Comment feedback={item.feedback} _id={item._id} hideinput={true} more={true}></Comment>
                            </div>
                    })
                }
            </ul>
        </div>
    }
}
export default connect(
    ({message})=>({
        "savearr":message.save,
        "result":(function(){
            if(message.result){
                message.result.filter((item) => {
                    return item.saveit == true;
                })
            }
            return [];
        })()
    }),
    (dispatch)=>{
        return {
            save(_id,bool){
                dispatch({"type":"message/save_async",_id,bool})
            }
        }
    }
)(Rightpart);