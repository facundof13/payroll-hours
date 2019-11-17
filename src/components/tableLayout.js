import React from "react";
import TimeRow from "./timeRow";

export default class TableLayout extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.receiveHoursInDay = this.receiveHoursInDay.bind(this);
  }

  receiveHoursInDay(hours) {
    //hours.totalMinutes
    //hours.totalHours
    this.props.adjustArray(hours);
  }

  render() {
    return (
      <div className='table-container'>
        <table className="greyGridTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>In time</th>
              <th>Out time</th>
              <th>Break start and end times</th>
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
      </div>
    );
  }
}
