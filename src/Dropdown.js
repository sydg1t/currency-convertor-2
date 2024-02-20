import React from 'react';
import { json, checkStatus } from './utils';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyNames: [],
    }
    
  }

  componentDidMount() {
    const { currencyNames} = this.state;
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
    const {onChange, value, name} = this.props;
    const {currencyNames} = this.state;
  
    
    return (
      <select className='w-100' name={name} onChange={onChange} value={value} >
        {currencyNames.length > 0 && currencyNames.map((currency, index) => (
          <option key={index} value={currency.slice(0,3)} >{currency}</option>
        ))}
      </select>
    )
  }
}

export default Dropdown;