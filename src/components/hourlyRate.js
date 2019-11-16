import React from 'react'

export default class HourlyRate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const rate = this.props.rate
    return (
      <div>
        <label>Enter hourly pay rate:</label>
        <input type='number' value={rate} onChange={(e) => { this.props.onRateChange(e) }}></input>
      </div>
    )
  }
}