import React from "react";
import HourlyRate from "./hourlyRate";
import DatePickers from "./datePickers";
import TimeRow from "./timeRow";
import moment from "moment";
export default class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 13,
      firstDate: null,
      secondDate: null,
      dateArr: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(e) {
    this.setState({ rate: e.target.value });
  }

  handleDateChange(e, which) {
    // do date checking in datePickers component
    this.setState({ [which]: e }, () => {
      this.findDifferenceOfDays();
    });
  }

  findDifferenceOfDays() {
    if (this.state.firstDate && this.state.secondDate) {
      if (
        !moment(this.state.secondDate).isBefore(moment(this.state.firstDate)) &&
        !moment(this.state.firstDate).isAfter(moment(this.state.secondDate))
      ) {
        this.setState(
          {
            daysDifference:
              moment(this.state.secondDate).diff(
                moment(this.state.firstDate),
                "days"
              ) + 1
          },
          () => {
            this.populateArray();
          }
        );
      }
    }
  }

  populateArray() {
    let dateArr = [];
    for (let i = 0; i < this.state.daysDifference; i++) {
      dateArr.push(moment(this.state.firstDate).add(i, "d").format('MMMM DD YYYY'));
    }
    this.setState({dateArr: dateArr})
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <HourlyRate onRateChange={this.handleChange} rate={this.state.rate} />
        <DatePickers
          firstDate={this.state.firstDate}
          secondDate={this.state.secondDate}
          onDateChange={this.handleDateChange}
        />
        {this.state.dateArr.map(date => (
          <TimeRow key={date} date={date} />
        ))}
      </div>
    );
  }
}
