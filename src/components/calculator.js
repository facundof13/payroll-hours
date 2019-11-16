import React from 'react'
import HourlyRate from './hourlyRate'
import DatePickers from './datePickers'

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rate: 13,
      firstDate: new Date(),
      secondDate: new Date(),
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleChange(e) {
    this.setState({rate: e.target.value})
  }

  handleDateChange(e, which) {
    this.setState({[which]: e})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <HourlyRate onRateChange={this.handleChange} rate={this.state.rate} />
        <DatePickers firstDate={this.state.firstDate} secondDate={this.state.secondDate} onDateChange={this.handleDateChange}/>
      </div>
    )
  }

}