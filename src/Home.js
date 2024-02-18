import React from 'react';
import { Link } from "react-router-dom";
import { checkStatus, json } from './utils';

import TableRow from './TableRow.js';
import CurrencyConvertor from './CurrencyConvertor';






class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'USD',
      currency2: 'EUR',
      qty1: 1,
      currencies: [],
      rates: [],
      amounts: [],
    }
    this.fillArrays = this.fillArrays.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const value = event.target.value;
    if (typeof value === String) {
      value = value.slice(0, 3);
    }
    this.setState({ [event.target.name]: value });
  }


  componentDidMount() {
    this.fillArrays();
  }

  componentDidUpdate() {
    this.fillArrays();
  }


  fillArrays() {

    fetch(`https://api.frankfurter.app/latest?from=${this.state.base}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (!data) {
          throw new Error(data.Error);
        }
        if (data) {

          const currencies = Object.keys(data.rates).map(key => `${key}`);
          const rates = Object.keys(data.rates).map(key => data.rates[key].toFixed(5));
          const amounts = rates.map((rate) => (rate * this.state.qty1).toFixed(5));
          this.setState({
            currencies: currencies,
            rates: rates,
            amounts: amounts
          });


        }

      })
      .catch((error) => {
        console.log(error);
      });
  }








  render() {
    const { currencies, rates, amounts, base, currency2, qty1 } = this.state;

    return (
      <div className='container'>
        <div className='row w-100'>
          <CurrencyConvertor currencies={currencies} amounts={amounts} fillArrays={this.fillArrays()} base={base} currency2={currency2} qty1={qty1} onChange={(event) => this.handleChange(event)} />

          <div id='comparison-chart' className='col-12 col-lg-8 my-5'>
            <table className='w-100'>
              <thead>
                <tr className='justify-content-center'>
                  <td>Currency</td>
                  <td>Rate Per Currency</td>
                  <td>Amt based on Qty</td>

                </tr>
              </thead>

              <TableRow currencies={currencies} rates={rates} amounts={amounts} />

            </table>
          </div>

        </div>
      </div>
    )
  }
}

export default Home;