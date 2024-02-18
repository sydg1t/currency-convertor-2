import React from 'react';
import Dropdown from './Dropdown.js';

class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty2: 0,
    }

    this.calculateSecondQuantity = this.calculateSecondQuantity.bind(this);
  }



  calculateSecondQuantity = () => {
    const { currencies, amounts, currency2 } = this.props;
    
    const indexOfCurrency = currencies.indexOf(currency2);
    if (indexOfCurrency === -1) {
      console.log('currency not found');
      return;
    }
    const quantity = amounts[indexOfCurrency];
    this.setState({
      qty2: quantity
    });

  }
  
  componentDidMount() {
  
    setTimeout(() => {
        this.calculateSecondQuantity();
      }, 100);
  }
  componentDidUpdate() {
    let timer = false;
    if (!timer) {
      const timeout = window.setTimeout(() => {
    
      this.calculateSecondQuantity()
    }, 300) 
    }
    timer = true;
  }
   
  

  render() {
    const { qty2} = this.state;
    const {base, currency2, qty1, onChange} = this.props;
    return (
      <div id='currency-convertor' className=' col-12 col-lg-3 rounded-5 my-5 text-center me-5 h-25'>


        <div className='row my-5'>
          <div className='col-12 col-lg-6 '>
            <label>Base Currency</label><br />
            <Dropdown value={base} name='base' onChange={onChange} />
          </div>
          <div className='col-12 col-lg-4'>
            <label>Qty</label>
            <input name='qty1' className='w-100' type='number' value={qty1} onChange={onChange} />
          </div>

        </div>
        <div className='row my-5'>
          <div className='col-12 col-lg-6'>
            <label>Currency 2</label>
            <Dropdown name='currency2' value={currency2} onChange={onChange} />
          </div>
          <div className='col-12 col-lg-4'>
            <label>Qty</label>
            <p>{qty2}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConvertor;