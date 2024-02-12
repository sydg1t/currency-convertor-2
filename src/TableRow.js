import React from 'react';
import { json, checkStatus } from './utils';

class TableRow extends React.Component {
  render() {
    const { currencies, rates } = this.props;

    // Make sure both arrays have the same length
    const maxLength = Math.max(currencies.length, rates.length);
    
    // Map over both arrays simultaneously
    const tableRows = Array.from({ length: maxLength }, (_, index) => {
      const currency = currencies[index];
      const rate = rates[index];
      return (
        <tr key={index}>
          <td>{currency}</td>
          <td>{rate}</td>
        </tr>
      );
    });

    return <tbody>{tableRows}</tbody>;
  }
}

export default TableRow;
