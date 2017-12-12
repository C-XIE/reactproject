import React from "react";
import { connect } from "dva";
import Comment from "./Comment";
import Page from "./Page";

class Leftpart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showindex: null
        }
    }
    handletime(time) {
        // const arr = time.match(/(.+)T(.+)\..+/);
        // return arr[1]+" "+arr[2];
        //根据数据库存储的时间 转换为想要的格式
        let timeObj = new Date(time);
        let str = `${timeObj.getFullYear()}-${timeObj.getMonth() + 1}-${timeObj.getDate()} 星期${timeObj.getDay() == 0 ? "天" : timeObj.getDay()} ${timeObj.getHours() > 12 ? "下午" : "上午"}`
        return str;
    }
    addcomment(_id, comment) {
            this.props.addcomment(_id, comment)
    }
    dec_ideshow(index) {
        if (index != this.state.showindex){
            this.setState({ "showindex": index })
            console.log(1);
        }else{
            this.setState({"showindex":null})
        }
    }
    render() {
        const count = this.props.count;
        const result = this.props.result;
        const pagesize = 10;
        return <div className="leftpart">
            <div className="page">
                <Page count={count} pagesize={pagesize}></Page>
            </div>
            <span className="numspan">总共有{count}条留言</span>
            <button onClick={() => { this.props.show(true) }}>发布留言</button>
            {
                result.map((item, index) => {
                    return <div key={index}>
                        <div
                            className="item"
                        >
                            <h3 className="title">{item.title}</h3>
                            <p className="user">来自{item.email}</p>
                            <p>{item.content}</p>
                            <a href="javascript:void(0)" onClick={() => {this.dec_ideshow(index)}}><span>评论</span><b>{item.feedback.length}</b></a>
                            {"   "}
                            <a href="javascript:void(0)" onClick={() => { this.props.zan(item._id, item.zan + 1) }}>赞{item.zan}</a>
                            <a href="javascript:void(0)" onClick={() => { this.props.save(item._id, true) }}>收藏</a>
                            <span className="time">{this.handletime(item.time)}</span>
                        </div>
                        {
                            this.state.showindex == index ?
                                <Comment feedback={item.feedback} _id={item._id} addcomment={this.addcomment.bind(this)} h_ideinput={false}></Comment>
                                :
                                null
                        }
                    </div>
                })
            }
        </div>
    }
}
export default connect(
    ({ message }) => {
        return {
            "result": message.result ? message.result : [],
            "count": message.count ? message.count : 0,
            "feedback": message.feedback
        }
    },
    (dispatch) => ({
        save(_id, bool) {
            dispatch({ "type": "message/save_async", _id, bool })
        },
        zan(_id, num) {
            dispatch({ "type": "message/zan_async", _id, num })
        },
        addcomment(_id, comment) {
            dispatch({ "type": "message/addcomment_async", _id, comment })
        }
    })
)(Leftpart);