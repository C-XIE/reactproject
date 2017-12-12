import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import { Select } from 'antd';
import { Row, Col } from 'antd';
const Option = Select.Option;

class Selectmore extends React.Component {
    constructor(props) {
        super(props);
    }

    //根据选择的序号 得到查找的数据并发送dispatch
    //拼接显示在tag中的字符串
    handleChange(value) {
        const data = this.props.data;
        
        let arr = [];

        value.map((item, index) => {
             arr.push(data[item]);
        })
        let str = arr.join(" 或 ")
        if(str){
            this.props.addtag(this.props.k, arr, `${this.props.title}:${str}`);
        }else{
            this.props.deletetag(this.props.k)
        }
    }
    // componentWillUpdate(nextProps){
    //     console.log(nextProps.select);
    //     if(nextProps.select[this.props.k]==""){
    //         $(this.refs.selects).attr("defaultValue",[]);
    //     }
    // }
    render() {
        //bug find的全局数据无法影响 select选择
        const { data, title, word,find } = this.props;
        // let exit = [];
        // find.forEach((item) => {
        //     if (item.tagname == this.props.k) {
        //         exit = item.cont;
        //     }
        // })
        // console.log(exit);
        return <div className="selectmore">
            <Row  >
                <Col span={8} >
                    <span>{title}</span>
                </Col>
                <Col span={16} className="selectcol">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder={word}
                        onChange={this.handleChange.bind(this)}
                        mode={'multiple'}
                        optionFilterProp={'children'}
                        // defaultValue={exit}
                    >
                        {
                            data.map((item, index) => {
                                return <Option key={index}>{item}</Option>;
                            })
                        }
                    </Select>
                </Col>
            </Row>


        </div>
    }
}
export default connect(
    null,
    (dispatch) => ({
        addtag(k, v, cnname) {
            dispatch({ "type": "search/addtag", k, v, cnname })
        },
        deletetag(k) {
            dispatch({ "type": "search/deletetag", k})
        }
    })
)(Selectmore);