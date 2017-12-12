import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import Publish from "./Publish";

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            "data": {
                "name": {
                    "type": "职位名称",
                    "warn": "职位不能为空",
                    "placeholder": "请输入职位名称"
                },
                "company": {
                    "type": "公司名称",
                    "warn": "内容不能为空",
                    "placeholder": "请输入公司名称"
                },
                "startdate": {
                    "type": "开始时间",
                    "warn": "请选择时间"
                },
                "enddate": {
                    "type": "截止时间",
                    "warn": "请选择时间"
                },
                "hr": {
                    "type": "HR姓名",
                    "warn": "请输入名字",
                    "placeholder": "hr名字"
                },
                "money": {
                    "type": "薪水",
                    "warn": "请输入职位薪水",
                    "placeholder": "职位薪水"
                },
                "comment": {
                    "type": "职位描述",
                    "warn": "请填写职位描述",
                    "placeholder": "清输入职位描述"
                }
            }
        }
    }
    render() {
        return <div>
            <Publish data={this.state.data}></Publish>
        </div>
    }
}
export default connect()(Index);
