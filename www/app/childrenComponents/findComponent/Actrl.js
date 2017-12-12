import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';

import { Row, Col } from 'antd';



class Actrl extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { data, title,find } = this.props
        let exit = null;
        find.forEach((item) => {
            if (item.tagname == this.props.k) {
                exit = item.cont;
            }
        })
        return <div className="alist">
            <Row className="row" gutter={16}>
                <Col span={2} className="logo"><span>{title}:</span></Col>
                <Col span={22} className="ctrl">
                    {
                        data.map((item, index) => {
                            return <a
                                key={index}
                                href="javascript:void(0)"
                                onClick={()=>{this.props.addtag(this.props.k,item,`${title} : ${item}`)}}
                                className={classnames({ "cur": exit && exit==item})}
                            >{item}</a>
                        })
                    }
                </Col>
            </Row>
        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        addtag(k, v,cnname) {
            dispatch({ "type": "search/addtag", k, v, cnname })
        }
    })
)(Actrl);