import React from 'react'
import TimeRow from "./timeRow";

export default class TableLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <table style={{ width: 100 + '%' }}>
          <thead>
          <tr>
            <th>Date</th>
            <th>In</th>
            <th>Out</th>
            <th>Break</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {this.props.dateArr.map(date => (
              <TimeRow key={date} date={date} />
        ))}
          </tbody>
        </table>
    )
  }
}