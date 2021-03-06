import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class DatePickers extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='pickers'>
        <div>
        <label>Enter a starting payroll date:</label>
        <DatePicker
          todayButton="Today"
          selected={this.props.firstDate}
          onChange={(e) => { this.props.onDateChange(e, 'firstDate') }}
        />
        </div>
        <div>
        <label>Enter an ending date:</label>
        <DatePicker
          todayButton="Today"
          selected={this.props.secondDate}
          onChange={(e) => { this.props.onDateChange(e, 'secondDate') }}
      />
        </div>
      </div>
    )
  }
}