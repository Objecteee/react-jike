//柱状图组件
import * as echarts from 'echarts';
import { useEffect,useRef } from 'react';

//1.把功能代码放在这个组件中
//2.把可变的部分抽象成prop参数

const BarChart = ({  title,xData,yData }) => { 
        const chartRef=useRef(null)
    useEffect(()=>{
        //1.获取渲染图表的dom节点
        var chartDom = chartRef.current;
        //2.初始化echarts实例
        var myChart = echarts.init(chartDom);
        //3.准备图表参数
        var option = {
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: yData,
            type: 'bar'
            }
        ]
        };
        //4.使用图标参数渲染图表
        option && myChart.setOption(option);
    },[])
    return <div ref={chartRef} style={{width:'500px',height:'400px'}}></div>
}
export default BarChart