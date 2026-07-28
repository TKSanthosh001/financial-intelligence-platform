import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const EChartsTrend = ({ data, trend, height = 40 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    // Initialize echarts instance
    const chart = echarts.init(chartRef.current);

    const isUp = trend === 'up';
    const lineColor = isUp ? '#089981' : '#f23645'; // TradingView Green or Red
    const areaColorStart = isUp ? 'rgba(8, 153, 129, 0.2)' : 'rgba(242, 54, 69, 0.2)';
    const areaColorEnd = isUp ? 'rgba(8, 153, 129, 0)' : 'rgba(242, 54, 69, 0)';

    const option = {
      grid: {
        left: 0,
        right: 0,
        top: 2,
        bottom: 2,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
        min: 'dataMin',
        max: 'dataMax',
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: lineColor,
            width: 1.5,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: areaColorStart },
              { offset: 1, color: areaColorEnd },
            ]),
          },
        },
      ],
      tooltip: {
        show: false,
      },
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, trend]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

export default EChartsTrend;
