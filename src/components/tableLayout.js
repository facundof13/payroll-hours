import React from "react";
import TimeRow from "./timeRow";

export default class TableLayout extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props);

    this.receiveHoursInDay = this.receiveHoursInDay.bind(this)
  }

  receiveHoursInDay(hours) {
    //hours.totalMinutes
    //hours.totalHours
    this.props.adjustArray(hours);
  }

  render() {
    return (
      <table style={{ width: 100 + "%" }}>
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
          {this.props.dateArr.map(info => (
            <TimeRow
              key={info.date}
              sendHours={this.receiveHoursInDay}
              date={info.date}
              hours={info.hours}
              minutes={info.minutes}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
