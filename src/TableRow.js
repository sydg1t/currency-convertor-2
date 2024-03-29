import React from 'react';
import { json, checkStatus } from './utils';

class TableRow extends React.Component {
  render() {
    const { currencies, rates, amounts } = this.props;

    
    const maxLength = Math.max(currencies.length, rates.length, amounts.length);
    
    
    const tableRows = Array.from({ length: maxLength }, (_, index) => {
      const currency = currencies[index];
      const rate = rates[index];
      const amount = amounts[index];
      return (
        <tr key={index}>
          <td>{currency}</td>
          <td>{rate}</td>
          <td>{amount}</td>
        </tr>
      );
    });

    return <tbody>{tableRows}</tbody>;
  }
}

export default TableRow;
