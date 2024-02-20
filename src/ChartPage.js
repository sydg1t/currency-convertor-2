import React from 'react';
import Chart from 'chart.js/auto';
import { checkStatus, json } from './utils';
import Dropdown from './Dropdown';
class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      base: 'USD',
      quote: 'EUR',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      months: [],
      chartData: [],
      chartLabels: [],
      loading: false,
    }
    this.fillMonthsArray = this.fillMonthsArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fillChartData = this.fillChartData.bind(this);
    this.buildChart = this.buildChart.bind(this);
    this.getIndexOfMonth = this.getIndexOfMonth.bind(this);
  }

  buildChart = () => {
    const { months, chartData, base, quote, chartLabels } = this.state;
    this.setState({ loading: true });
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
  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
    const { startDate, endDate, base, quote } = this.state;
    setTimeout(() => {
      this.fillChartData(startDate, endDate, base, quote);
      this.buildChart();
    }, 1000);

  }
  componentDidMount() {
    const { base, quote, chartData } = this.state;
    const startDate = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    console.log(startDate);
    const endDate = new Date().toISOString().split('T')[0];
    this.setState({ startDate: startDate, endDate: endDate });
    this.fillChartData(startDate, endDate, base, quote);
    setTimeout(() => {
      this.fillMonthsArray();
      this.buildChart();
    }, 200)






  };
  componentDidUpdate() {
    const { base, quote, startDate, endDate, chartData } = this.state;
    let timer = false;
    if (!timer) {
      const timeout = window.setTimeout(() => {

        this.fillChartData(startDate, endDate, base, quote);
        if (this.state.loading === false) {
          
          this.setState({loading: false})
        }
      }, 300)
    }
    timer = true;
  }
  getIndexOfMonth (date) {
    
    return this.state.months.indexOf(date);
  }

  render() {
    const { startDate, endDate, months, base, quote } = this.state;
    return (
      <div className='container'>
        <div className='row w-100'>
          <div className="col-6 py-5 fs-4">
            <Dropdown name='base' value={base} onChange={(event) => this.handleChange(event)} />
          </div>
          <div className="col-6 py-5 fs-4">
            <Dropdown name='quote' value={quote} onChange={(event) => this.handleChange(event)} />
          </div>



          <div className='col-12 '>
            <h1>Chart</h1>
            <canvas ref={this.chartRef}></canvas>
            <div className='d-flex justify-content-between'>
              <span>
            <label className='me-2'>Start Date</label>
            
            <select name='startDate' value={startDate} onChange={(event) => this.handleChange(event)}>
              {months.length > 0 && months.map((date, index) => {
                if (this.getIndexOfMonth(date) > this.getIndexOfMonth(endDate)) {
                return <option key={index} value={date}>{date}</option>
                }
              })}
            </select>
            </span>
            <span>
              <label className='me-2'>End Date</label>
              <select name='endDate' value={endDate} onChange={(event) => this.handleChange(event)}>
                {months.map((date, index) => {
                  if (this.getIndexOfMonth(date) < this.getIndexOfMonth(startDate)) {
                  return <option key={index} value={date}>{date}</option>
                  }
                })}
              </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChartPage;