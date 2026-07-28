import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const FearGreedGauge = ({ value }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 100,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.2, '#f23645'],  // Extreme Fear
                [0.4, '#ffa726'],  // Fear
                [0.6, '#b2b5be'],  // Neutral
                [0.8, '#26a69a'],  // Greed
                [1, '#089981']     // Extreme Greed
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,20c0.4,0.7,0.2,1.5-0.4,1.9c-0.2,0.1-0.4,0.2-0.7,0.2H1.3c-0.8,0-1.5-0.7-1.5-1.5c0-0.3,0.1-0.5,0.2-0.7l12-20C12.3,0.1,12.5,0,12.8,0.7z',
            length: '75%',
            width: 8,
            offsetCenter: [0, '5%'],
            itemStyle: {
              color: '#f0f3fa'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 3
            }
          },
          axisLabel: {
            color: '#b2b5be',
            fontSize: 10,
            distance: -45,
            formatter: function (val) {
              if (val === 10) {
                return 'Fear';
              } else if (val === 50) {
                return 'Neutral';
              } else if (val === 90) {
                return 'Greed';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 14,
            color: '#b2b5be',
            fontWeight: 'bold'
          },
          detail: {
            fontSize: 28,
            offsetCenter: [0, '0%'],
            valueAnimation: true,
            formatter: '{value}',
            color: '#f0f3fa',
            fontWeight: '800'
          },
          data: [
            {
              value: value,
              name: ''
            }
          ]
        }
      ]
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
  }, [value]);

  return <div ref={chartRef} style={{ width: '100%', height: '140px' }} />;
};

export default FearGreedGauge;
