import React from "react";
import classnames from "classnames";
import { Link } from 'dva/router';

import '../css/index.less';
export default class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            showuser: false
        }
    }
    changeuser() {
        window.location = "/info";
        this.setState({ "showuser": true })
    }
    render() {
        const nav = this.props.nav
        return <div className="navonly">
            <ul className="navli">
                {
                    nav.map((item, index) => {
                        //针对 user界面 不使用 router 路由 而引入之前写的 外置页面，特别用if 处理了下
                        if (item.router == "/user") {
                            return <li
                                key={index}
                                className={classnames({ "cur": this.state.showuser })}
                            ><a href="javascript:void(0)" onClick={() => { this.changeuser() }} >{item.show}</a></li>
                        }
                        return <li
                            key={index}
                            onClick={() => { this.setState({ "showuser": false }) }}
                            className={classnames({ "cur": window.location.hash == "#" + item.router })}
                        ><Link to={item.router}>{item.show}</Link></li>
                    })
                }
            </ul>
        </div>
    }
}