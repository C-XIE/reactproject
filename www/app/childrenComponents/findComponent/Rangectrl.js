import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';

import { Input, Select, Tabs, Row, Col } from 'antd';
const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;



class Rangectrl extends React.Component {
    constructor({ data }) {
        super();
        this.state = {
            "range": [data.min, data.max]
        }

    }
    hander(min,max,title){
        this.props.addtag("money",[min,max],`${title} : ${min}到${max}元`)
    }
    render() {
        const { example } = this.props.data;
        const find = this.props.find;
        const title = this.props.title;
        let exit = null;
        find.forEach((item) => {
            if (item.tagname == this.props.k) {
                exit = item.cont;
            }
        })
        return <div className="alist">
            <Row className="row" gutter={16}>
                <Col span={2} className="logo"><span>{title}:</span></Col>
                <Col span={8} className="ctrl">
                    {
                        example.map((item, index) => {
                            return <a
                                key={index}
                                href="javascript:void(0)"
                                onClick={() => { this.setState({ "range": item.num });this.hander(item.num[0],item.num[1],title) }}
                                className={classnames({ "cur": exit&&exit[0]==item.num[0]&&exit[1]==item.num[1]})}
                            >{item.show}</a>;
                        })
                    }
                </Col>
                <Col span={14} className="rangeInput">
                    <InputGroup compact>
                        <Input
                            style={{ width: 80, textAlign: 'center' }}
                            placeholder="最低价格"
                            value={this.state.range[0]}
                            onChange={(e) => { this.setState({ "range": [e.target.value, this.state.range[1]] }); this.hander(e.target.value, this.state.range[1],title)}}
                        />
                        <Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                        <Input
                            style={{ width: 80, textAlign: 'center', borderLeft: 0 }}
                            placeholder="最高价格"
                            value={this.state.range[1]}
                            onChange={(e) => { this.setState({ "range": [this.state.range[0], e.target.value] }); this.hander(this.state.range[0], e.target.value,title)}}
                        />
                        <div className="word">
                            <span>{this.state.range[0]}~{this.state.range[1]}元</span>
                        </div>
                    </InputGroup>
                </Col>
            </Row>
        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        addtag(k, v,cnname) {
            dispatch({ "type": "search/addtag", k, v,cnname })
        }
    })
)(Rangectrl);