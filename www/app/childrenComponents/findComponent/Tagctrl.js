import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import { Tag } from 'antd';

class Tagctrl extends React.Component {
    constructor(props) {
        super(props);
        
    }
    delete(k){
        this.props.deletetag(k);
    }
    render() {
        const find = this.props.find;
        return <div className="tagctrl">
            {
               find.map((item,index)=>{
                    
                    return <Tag key={index} closable color="red" afterClose={()=>{this.delete(item.tagname)}}>{item.cnname}</Tag>
                })
            }
        </div>
    }
}
export default connect(
    null,
    (dispatch)=>({
        deletetag(k){
            dispatch({"type":"search/deletetag",k})
        }
    })
)(Tagctrl);