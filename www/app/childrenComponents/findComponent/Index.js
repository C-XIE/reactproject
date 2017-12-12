import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { Row, Col } from 'antd';

import Typectrl from "./Typectrl";
import Actrl from "./Actrl";
import Rangectrl from "./Rangectrl";
import Selectmore from "./Selectmore";
import Tagctrl from "./Tagctrl";
import Tableshow from "./Tableshow";

import "../../css/find.less";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "type": [
                {
                    "tagname": "技术",
                    "tag": ["前端开发", "移动开发", "后台开发","测试","运维管理"]
                },
                {
                    "tagname": "产品",
                    "tag": ["产品经理", "产品设计师"]
                },
                {
                    "tagname": "设计",
                    "tag": ["UI设计", "网页设计", "交互设计"]
                }
            ],
            "group": ["北京", "上海", "广州", "深圳"],
            "money": {
                "example": [
                    { "show": "5000以下", "num": [2000, 5000] },
                    { "show": "5000-6000", "num": [5000, 6000] },
                    { "show": "6000-8000", "num": [6000, 8000] },
                    { "show": "8000-10000", "num": [8000, 10000] },
                ],
                "min": 0,
                "max": 10000
            },
            "rom": ["大专", "本科", "硕士", "博士", "不限"],
            "color": ["应届生", "1年", "2年", "5年", "不限"],
            "fom": ["未融资", "A轮", "B轮", "C轮", "上市"]
        }
        
    }
    componentDidMount(){
        this.props.dispatch({ "type": "search/init_async" });
    }
    render() {
        return <div>
            <Typectrl data={this.state.type} k="type" find={this.props.find} title="职位"></Typectrl>
            <Actrl data={this.state.group} k="group" find={this.props.find} title="地点"></Actrl>
            <Rangectrl data={this.state.money} k="money" find={this.props.find} title="薪水"></Rangectrl>
            <div className="alist">
                <Row className="row" gutter={16}>
                    <Col span={2} className="logo"><span>选填:</span></Col>
                    <Col span={5} className="ctrl">
                        <Selectmore k="rom" data={this.state.rom} find={this.props.find} title="学历" word="清选择学历要求"></Selectmore>
                    </Col>
                    <Col span={5} className="ctrl">
                        <Selectmore k="color" data={this.state.color} find={this.props.find} title="工作经验" word="清选择工作经验"></Selectmore>
                    </Col>
                    <Col span={5} className="ctrl">
                        <Selectmore k="fom" data={this.state.fom} find={this.props.find} title="公司性质" word="请选择公司性质"></Selectmore>
                    </Col>
                    <Col span={7} className="ctrl">
                    </Col>
                </Row>
            </div>
            <div className="alist">
                <Row className="row" gutter={16}>
                    <Col span={2} className="logo"><span>所有分类:</span></Col>
                    <Col span={22} className="ctrl">
                        <Tagctrl find={this.props.find}></Tagctrl>
                    </Col>
                </Row>
            </div>
            <div><b>当前检索到职位信息{this.props.count}条</b></div>
            <div>
                <Tableshow></Tableshow>
            </div>
        </div>
    }
}
export default connect(
    ({search})=>({
        find:search.find,
        count:search.count
    })
)(Index);
