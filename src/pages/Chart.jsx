import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../styles/components.css'

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieSeries: [20, 30, 60, 180, 90, 120],
      pieOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return val.toFixed(2) + '%';
          },
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
        title: {
          text: 'Cooking time for all',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },

      areaOptions: {
        chart: {
          type: 'area',
          height: 350,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Area with Negative Values',
          align: 'left',
          style: {
            fontSize: '14px',
          },
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
          labels: {
            style: {
              colors: '#0d00ff',
            },
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 0.5,
        },
        tooltip: {
          x: {
            format: 'yyyy',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
          },
        },
        grid: {
          yaxis: {
            lines: {
              offsetX: -30,
            },
          },
          padding: {
            left: 20,
          },
        },
      },

      barSeries: [
        {
          data: [390, 405, 414, 484, 540, 584, 640, 1130, 1280, 1400],
        },
      ],
      barOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Norin :',
            'Shashlik :',
            'Makaron :',
            'Mastava :',
            'Lag`mon :',
            'Qatlama somsa :',
            'Somsa :',
            'Manti :',
            'Sho`rva :',
            'Palov :',
          ],
        },
      },
    };
  }

  render() {
    return (
      <div className='chartBar'>
        <div className='pieChart'>
          <h2>Pie Chart</h2>
          <ReactApexChart
            options={this.state.pieOptions}
            series={this.state.pieSeries}
            type="pie"
            width={380}
          />
        </div>
        <div id="barChart">
          <h2>Taom tayorlanish vaqti</h2>
          <ReactApexChart
            options={this.state.barOptions}
            series={this.state.barSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
