import React from 'react';
import classnames from 'classnames'
import { connect } from 'dva';
import echarts from 'echarts';

class Infoindex extends React.Component {
    constructor({ init }) {
        super();
    }
    componentDidUpdate() {
        const city = this.props.city;
        let myChart = echarts.init($(this.refs.circle)[0]);
        const option = {
            title: {
                text: '内部各地职位统计',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['北京', '上海', '广州', '深圳']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: city.beijing, name: '北京' },
                        { value: city.shanghai, name: '上海' },
                        { value: city.guangzhou, name: '广州' },
                        { value: city.shenzhen, name: '深圳' },
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
        return <div className="infoindex">
            <div style={{ "width": "600px", "height": "400px" }} ref="circle"></div>
        </div>
    }
}
export default connect()(Infoindex);