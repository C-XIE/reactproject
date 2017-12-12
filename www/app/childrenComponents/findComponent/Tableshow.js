import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import { Table } from 'antd';
class Tableshow extends React.Component {
    constructor(props) {
        super(props);

    }
    changepage(page,pageSize){
        // console.log(page,pageSize)
        this.props.dispatch({ "type": "search/changepage", page,pageSize})
    }
    changepagesize(current, pageSize){
        // console.log(current, size);
        this.props.dispatch({ "type": "search/changepage",page:1, pageSize })
    }
    render() {
        const columns = [
            {
                title: '职位类别',
                dataIndex: 'type',
                key:"type"
            },
            {
                title: '职位名称',
                dataIndex: 'name',
                key: "name"
            }, {
                title: '公司',
                dataIndex: 'company',
                key: "company"
            }, {
                title: '薪水',
                dataIndex: 'money',
                key: "money"
            }, {
                title: '学历要求',
                dataIndex: 'rom',
                key: "rom"
            }, {
                title: '工作经验',
                dataIndex: 'color',
                key: "color"
            }, {
                title: '公司性质',
                dataIndex: 'fom',
                key: "fom"
            }, {
                title: '开始时间',
                dataIndex: 'startdate',
                key: "startdate"
            }, {
                title: '截止时间',
                dataIndex: 'enddate',
                key: "enddate"
            }, {
                title: '备注',
                dataIndex: 'comment',
                key: "comment"
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };
        // console.log(this.props.result);
        return <div className="table">
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.result}
                pagination={{
                    "total":this.props.count,
                    "showSizeChanger":true,
                    "showQuickJumper":true,
                    "onChange":this.changepage.bind(this),
                    "onShowSizeChange":this.changepagesize.bind(this),
                    "current":this.props.page,
                    "pageSize":this.props.pagesize
                }}
                // scroll={{"y":false}}
            />
        </div>
    }
}
export default connect(
    ({ search }) => ({
        "result": search.result,
        "count":search.count,
        "page":search.page,
        "pagesize":search.pageSize
    })
)(Tableshow);