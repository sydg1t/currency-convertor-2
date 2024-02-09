import React from 'react';
import { Link } from "react-router-dom";
import { checkStatus, json } from './utils';

class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency1: '',
      currency2: '',
      qty1: 0,
      qty2: 0,
      currencies: [],
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleQuantityChange = (event, quantity) => {
    this.setState({ [quantity]: event.target.value });

  }

  handleCurrencyChange = (event, currency) => {
    this.setState({ [currency]: event.target.value});
  }

  componentDidMount() {
    fetch(`https://api.frankfurter.app/currencies`).then(checkStatus).then(json).then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      if (data.Response === 'True') {
        console.log(data);
        this.setState({currencies: data});
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { currency1, currency2, qty1, qty2, currencies } = this.state;

    return (
      <div className='container'>
        <div className='row'>
          <div id='currency-convertor' className=' col-12 col-lg-3 border rounded-5 my-5 text-center me-5'>
            
              
              <div className='row my-5'>
                <div className='col-12 col-lg-6 '>
                  <label>Currency 1</label><br />
                  <select className='w-100' value={currency1} onChange={(event) => this.handleCurrencyChange(event, 'currency1')} >
                    {currencies.map((currency, index) => {
                      return <option key={index} value={currency}>{currency}</option>
                    })}
                  </select>
                </div>
                <div className='col-12 col-lg-4'>
                  <label>Qty</label>
                  <input className='w-100' type='number' value={qty1} onChange={(event) => this.handleQuantityChange(event, 'qty1')} />
                </div>
              </div>
              <div className='row my-5'>
                <div className='col-12 col-lg-6'>
                  <label>Currency 2</label>
                  <select className='w-100' value={currency2} onChange={(event) => this.handleCurrencyChange(event, 'currency2')} />
                </div>
                <div className='col-12 col-lg-4'>
                  <label>Qty</label>
                  <input className='w-100' type='number' value={qty2} onChange={(event) => this.handleQuantityChange(event, 'qty2')} />
                </div>
              </div>
            </div>
          
          <div id='comparison-chart' className='col-12 col-lg-8 border my-5'>
            <table className='w-100'>
              <thead>
                <tr className='justify-content-center'>
                  <td>Currency</td>
                  <td>Rate Per Currency</td>
                  <td>Amt based on Qty</td>
                  <td><button>Sort</button></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConvertor;