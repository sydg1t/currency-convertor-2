import React from 'react';
import Chart from 'chart.js/auto';
import { checkStatus, json } from './utils';
import CurrencyConvertor from './CurrencyConvertor';
class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      base: 'USD',
      quote: 'EUR',
      startDate: '2024-01-19',
      endDate: '2024-02-19',
      months: [],
      chartData: [],
      chartLabels: [],
      chart: false,
    }
    this.fillMonthsArray = this.fillMonthsArray.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.fillChartData = this.fillChartData.bind(this);
    this.buildChart = this.buildChart.bind(this);
  
  }

  buildChart = () => {
    const { months, chartData, base, quote, chartLabels } = this.state;
    
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(
      this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: `${base}/${quote}`,
            data: chartData
          }
        ]
      }
    }
    )
  
  }
  

  
  fillChartData(startDate, endDate, base, quote) {
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`).then(checkStatus).then(json).then((data) => {
      if (!data) {
        throw new Error(data.Error);
      }
      if (data) {

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        this.setState({ chartLabels: chartLabels, chartData: chartData });
        const chartLabel = `${base}/${quote}`;
        this.fillMonthsArray();
      }
    }).catch((error) => console.log(error));
  }

  fillMonthsArray() {


    let months = [];
    for (let i = 0; i <= 11; i++) {
      months.push(new Date(new Date().getTime() - (i * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]);
    }
    this.setState({ months: months });
  }
  handleDateChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    const { base, quote, startDate, endDate, chartData } = this.state;
    this.fillChartData(startDate, endDate, base, quote);
    setTimeout(() => {
      this.fillMonthsArray();
      this.buildChart();
    }, 100)






  };
  // componentDidUpdate() {
  //   const { base, quote, startDate, endDate, chartData } = this.state;
  //   let timer = false;
  //   if (!timer) {
  //     const timeout = window.setTimeout(() => {
  //       this.fillMonthsArray();
  //       this.fillChartData(startDate, endDate, base, quote);
  //       if (chartData.length > 0) {
  //         this.buildChart();
  //       }
  //     }, 300)
  //   }
  //   timer = true;
  // }

  render() {
    const { startDate, endDate, months, base, quote } = this.state;
    return (
      <div className='container'>
        <div className='row w-100'>
        <CurrencyConvertor base={base} currency2={quote}   />
        <div id='comparison-chart' className='col-12 col-lg-8 my-5'>
        <h1>Chart</h1>
        <canvas ref={this.chartRef}></canvas>
        <label>Start Date</label>
        <select name={startDate} onChange={(event) => this.handleDateChange(event)}>
          {months.length > 0 && months.map((date, index) => {
            return <option key={index} value={date}>{date}</option>
          })}
        </select>
        <label>End Date</label>
        <select name={endDate} onChange={(event) => this.handleDateChange(event)}>
          {months.map((date, index) => {
            return <option key={index} value={date}>{date}</option>
          })}
        </select>
</div>
      </div>
      </div>
    )
  }
}

export default ChartPage;