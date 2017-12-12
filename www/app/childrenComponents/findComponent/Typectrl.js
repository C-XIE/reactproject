import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';

import { Row, Col } from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;



class Typectrl extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let exit = null;
        const {data,title,find} = this.props;
        find.forEach((item)=>{
            if(item.tagname == this.props.k){
                 exit = item.cont;
            }
        })
        return <div className="search">
            <Row className="row" gutter={16}>
                <Col span={2} className="logo"><span>{title}:</span></Col>
                <Col span={22} className="ctrl">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.callback}
                        animated={false}
                        size="small"
                    >
                        {
                            data.map((item, index) => {
                                return <TabPane
                                    tab={item.tagname}
                                    key={index}
                                >
                                    {
                                        item.tag.map((item1, index1) => {
                                            return <a
                                                key={index1}
                                                href="javascript:void(0)"
                                                onClick={()=>{this.props.addtag(this.props.k,item1,`${title} : ${item1}`)}}
                                                className={classnames({"cur":exit&&exit==item1})}
                                            >{item1}</a>
                                        })
                                    }
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Col>
            </Row>

        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        addtag(k,v,cnname) {
            dispatch({ "type": "search/addtag", k,v,cnname })
        }
    })
)(Typectrl);