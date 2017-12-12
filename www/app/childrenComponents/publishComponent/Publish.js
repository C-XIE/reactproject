import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { Input, Icon, Button } from 'antd';
import { DatePicker } from 'antd';
import { Link } from 'dva/router';
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;

import "../../css/publish.less"

class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "content": {
                name: "",
                company: "",
                startdate: "",
                enddate: "",
                hr: "",
                money: "",
                comment: ""
            },
            "showname": false,
            "showcompany": false,
            "showstartdate": false,
            "showenddate": false,
            "showhr": false,
            "showmoney": false,
            "showcomment": false
        }
    }
    //获取输入的事件写入state  开始时间
    onChangeBuy(date, dateString) {
        this.setState({
            ...this.state,
            "content": {
                ...this.state.content,
                "startdate": dateString
            },
            "showstartdate": false
        });
    }
    //截止时间
    onChangeGet(date, dateString) {
        this.setState({
            ...this.state,
            "content": {
                ...this.state.content,
                "enddate": dateString
            },
            "showenddate": false
        });
    }
    //对提交的内容做简单判断,符合要求后发送dispatch
    pushData(content) {
        let arr = [];
        Object.keys(content).forEach((item) => {
            if (content[item] == "") {
                this.setState({
                    ["show" + item]: true
                })
                arr.push(1);
            }
        })
        if (arr.length == 0) {
            this.props.addItem(content);
            alert("提交成功")
            this.setState({
                ...this.state,
                "content": {
                    ...this.state.content,
                    name: "",
                    company: "",
                    hr: "",
                    money: "",
                    comment: ""
                }
            })
        }
    }
    render() {
        const { name, company, startdate, enddate, hr, money, comment } = this.props.data;
        return <div className="publish">
            {/* <div className="title"><h1>采购订单</h1></div> */}
            {/* {JSON.stringify(this.state)} */}
            {/* <hr/> */}
            <div className="content">
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{name.type}</span>
                        </Col>
                        <Col span={18}>
                            <Input
                                placeholder={name.placeholder}
                                size="large"
                                style={{ "width": 300 }}
                                prefix={<Icon type="upload" />}
                                value={this.state.content.name}
                                onChange={(e) => { this.setState({ ...this.state, "content": { ...this.state.content, "name": e.target.value }, "showname": false }) }}
                            />
                            {
                                this.state.showname ?
                                    <span className="warn">{name.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{company.type}</span>
                        </Col>
                        <Col span={18}>
                            <Input
                                placeholder={company.placeholder}
                                size="large"
                                prefix={<Icon type="user" />}
                                style={{ "width": 300 }}
                                value={this.state.content.company}
                                onChange={(e) => { this.setState({ ...this.state, "content": { ...this.state.content, "company": e.target.value }, "showcompany": false }) }}
                            />
                            {
                                this.state.showcompany ?
                                    <span className="warn">{company.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{startdate.type}</span>
                        </Col>
                        <Col span={18}>
                            <DatePicker
                                onChange={this.onChangeBuy.bind(this)} />
                            {
                                this.state.showstartdate ?
                                    <span className="warn">{startdate.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{enddate.type}</span>
                        </Col>
                        <Col span={18}>
                            <DatePicker onChange={this.onChangeGet.bind(this)} />
                            {
                                this.state.showenddate ?
                                    <span className="warn">{enddate.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{hr.type}</span>
                        </Col>
                        <Col span={18}>
                            <Input
                                placeholder={hr.placeholder}
                                size="large"
                                style={{ "width": 300 }}
                                prefix={<Icon type="user" />}
                                value={this.state.content.hr}
                                onChange={(e) => { this.setState({ ...this.state, "content": { ...this.state.content, "hr": e.target.value }, "showhr": false }) }}
                            />
                            {
                                this.state.showhr ?
                                    <span className="warn">{hr.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{money.type}</span>
                        </Col>
                        <Col span={18}>
                            <Input
                                placeholder={money.placeholder}
                                size="large"
                                style={{ "width": 300 }}
                                prefix={<Icon type="pay-circle" />}
                                value={this.state.content.money}
                                onChange={(e) => { this.setState({ ...this.state, "content": { ...this.state.content, "money": e.target.value }, "showmoney": false }) }}
                            />
                            {
                                this.state.showmoney ?
                                    <span className="warn">{money.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">
                            <span>{comment.type}</span>
                        </Col>
                        <Col span={18}>
                            <TextArea
                                autosize={true}
                                value={this.state.content.comment}
                                placeholder={comment.placeholder}
                                onChange={(e) => { this.setState({ ...this.state, "content": { ...this.state.content, "comment": e.target.value }, "showcomment": false }) }}
                            />
                            {
                                this.state.showcomment ?
                                    <span className="warn">{comment.warn}</span>
                                    :
                                    null
                            }
                        </Col>
                    </Row>
                </div>
                <div className="allinput">
                    <Row>
                        <Col span={6} className="row">

                        </Col>
                        <Col span={18}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => { this.pushData(this.state.content) }}
                            >提交</Button>
                        </Col>
                    </Row>
                </div>
                <div className="footer">
                    <Link to="/">首页</Link>
                    copyright<Icon type="copyright" />2017
                    </div>
            </div>
        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        addItem(content) {
            dispatch({ "type": "publish/add_async", content })
        }
    })
)(Publish);