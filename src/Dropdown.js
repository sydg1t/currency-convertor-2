import React from 'react';
import { json, checkStatus } from './utils';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    
    
  }

  
  

  render() {
    const {currencies, onChange, value} = this.props;
    
    return (
      <select className='w-100' onChange={onChange} >
        {currencies.length > 0 && currencies.map((currency, index) => (
          <option key={index} value={currency} >{currency}</option>
        ))}
      </select>
    )
  }
}

export default Dropdown;