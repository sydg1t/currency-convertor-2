import React from 'react';
import { Link } from "react-router-dom";
import { checkStatus, json } from './utils';
import Dropdown from './Dropdown.js';
import TableRow from './TableRow.js';







class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency1: '',
      currency2: '',
      qty1: 1,
      qty2: 0,
      currencyNames: [],
      currencies: [],
      rates: [],
      amounts: []
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.switchCurrencies = this.switchCurrencies.bind(this);
    this.calculateAmountsArray = this.calculateAmountsArray.bind(this);
  }

  handleQuantityChange = (event) => {
    const selectedQuantity = event.target.value;
    this.setState({ qty1: selectedQuantity });
    this.calculateSecondCurrency(this.state.currency2, selectedQuantity);
    this.calculateAmountsArray(selectedQuantity);
  }
  switchCurrencies = (event) => {
    const { currency1, currency2 } = this.state;
    const selectedCurrency = currency1;
    this.setState({ currency1: currency2, currency2: selectedCurrency });
  }

  handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value.slice(0, 3);
    
    this.setState({ currency1: selectedCurrency });
    fetch(`https://api.frankfurter.app/latest?from=${selectedCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (!data) {
          throw new Error(data.Error);
        }
        if (data) {

          const currencies = Object.keys(data.rates).map(key => `${key}`);
          const rates = Object.keys(data.rates).map(key => data.rates[key].toFixed(5));
          this.calculateAmountsArray(1);
          this.setState({ currencies: currencies, rates: rates });

        }

      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  handleSecondCurrencyChange = (event) => {
    const selectedCurrency = event.target.value.slice(0, 3);
    this.setState({ currency2: selectedCurrency });
    this.calculateSecondCurrency(selectedCurrency, this.state.qty1);
  }

  calculateSecondCurrency = (currency, multiplier) => {

    if (this.state.currencies.length === 0 || this.state.rates.length === 0) {
      return;
    }
    const currencies = this.state.currencies;
    const indexOfCurrency = currencies.indexOf(currency);
    if (indexOfCurrency === -1) {
      console.error('Selected currency not found in the list.');
      return;
    }
    const rate = this.state.rates[indexOfCurrency];
    if (isNaN(rate)) {
      console.error('Exchange rate is not a number.');
      return;
    }
    const quantity = parseFloat(rate) * multiplier;
    this.setState({
      qty2: quantity
    });
    
  }
  calculateAmountsArray(multiplier) {
    
    const {rates, amounts, currencies} = this.state;
    const amountsArr = rates.map((rate) => (rate * multiplier).toFixed(5));
    
    this.setState({amounts: amountsArr});
  }



  componentDidMount() {
    fetch(`https://api.frankfurter.app/currencies`).then(checkStatus).then(json).then((data) => {

      if (!data) {
        throw new Error(data.Error);
      }
      if (data) {
        const currencies = Object.keys(data).map(key => `${key} (${data[key]})`);

        this.setState({ currencyNames: currencies });

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { currency1, currency2, qty1, qty2, currencies, rates, currencyNames, amounts } = this.state;

    return (
      <div className='container'>
        <div className='row w-100'>
          <div id='currency-convertor' className=' col-12 col-lg-3 rounded-5 my-5 text-center me-5 h-25'>


            <div className='row my-5'>
              <div className='col-12 col-lg-6 '>
                <label>Base Currency</label><br />
                <Dropdown currencies={currencyNames} value={currency1} onChange={(event) => this.handleCurrencyChange(event)} />
              </div>
              <div className='col-12 col-lg-4'>
                <label>Qty</label>
                <input className='w-100' type='number' value={qty1} onChange={(event) => this.handleQuantityChange(event)} />
              </div>
              <div className='col-12 col-lg-4'>
                <button className='btn bg-white' onClick={(event) => this.switchCurrencies(event)} >Swap</button>
              </div>
            </div>
            <div className='row my-5'>
              <div className='col-12 col-lg-6'>
                <label>Currency 2</label>
                <Dropdown currencies={currencyNames} value={currency2} onChange={(event) => this.handleSecondCurrencyChange(event)} />
              </div>
              <div className='col-12 col-lg-4'>
                <label>Qty</label>
                <p>{qty2}</p>
              </div>
            </div>
          </div>

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

export default CurrencyConvertor;