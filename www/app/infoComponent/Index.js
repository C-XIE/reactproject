import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Layout} from 'antd';
import Nav from "./Nav";
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "nav": [
                {
                    "show": "首页",
                    "router": "/"
                },
                {
                    "show": "发布职位",
                    "router": "/publish"
                },
                {
                    "show": "查找职位",
                    "router": "/find"
                },
                {
                    "show": "个人留言",
                    "router": "/message"
                },
                {
                    "show": "个人资料",
                    "router": "/user"
                }
            ]

        }
    }
    render() {
        let selectNum = 0;
        return (
            <Layout>
                <Nav nav={this.state.nav}></Nav>
                <Layout>
                    {/* <Layout>
                <Sider width={150} style={{ background: '#fff' }} collapsed={false} >
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub']}
                        style={{ height: '100%', borderRight: 1 }}
                        className="indexMenu"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />个人资料</span>}>
                            <Menu.Item key="1">修改</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />资料查找</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
 
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />互动娱乐</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </Layout> */}
                    <Layout>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: document.body.clientHeight }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

        );
    }
}
export default connect()(Index);
