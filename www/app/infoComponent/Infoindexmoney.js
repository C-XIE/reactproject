import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import echarts from 'echarts';

class Infoindexmoney extends React.Component {
    constructor({ init }) {
        super();
    }
    componentDidUpdate() {
        const money = this.props.money;
        let myChart = echarts.init($(this.refs.circle1)[0]);
        const option = {
            title: {
                text: '各工资阶段职位数量',
                subtext: '动态数据',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['2000-5000', '5000-6000', '6000-7000', '7000-8000',"8000-10000"]
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: money.a, name: '2000-5000' },
                        { value: money.b, name: '5000-6000' },
                        { value: money.c, name: '6000-7000' },
                        { value: money.d, name: '7000-8000' },
                        { value: money.e, name: '8000-10000' },
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return <div className="infoindexmoney">
            <div style={{ "width": "600px", "height": "400px" }} ref="circle1"></div>
        </div>
    }
}
export default connect()(Infoindexmoney);