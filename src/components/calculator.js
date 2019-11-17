import React from "react";
import HourlyRate from "./hourlyRate";
import DatePickers from "./datePickers";
import moment from "moment";
import TableLayout from "./tableLayout";
export default class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 13,
      firstDate: null,
      secondDate: null,
      dateArr: [],
      sumHours: 0,
      sumMinutes: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.adjustArray = this.adjustArray.bind(this);
    this.calculateTotalHours = this.calculateTotalHours.bind(this);
  }

  handleChange(e) {
    this.setState({ rate: e.target.value });
  }

  handleDateChange(e, which) {
    // do date checking in datePickers component
    this.setState(
      {
        [which]: e,
        dateArr: []
      },
      () => {
        this.findDifferenceOfDays();
      }
    );
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
      dateArr.push({
        date: moment(this.state.firstDate)
          .add(i, "d")
          .format("MMMM DD YYYY"),
        hours: "",
        minutes: ""
      });
      dateArr.sort((a, b) => {
        return moment(a.date).isAfter(moment(b.date));
      });
    }
    this.setState({ dateArr: dateArr });
  }

  adjustArray(hours) {
    console.log(hours);
    let arr = [...this.state.dateArr];
    let newArr = [...arr.filter(item => item.date !== hours.date), hours];

    newArr.sort((a, b) => {
      return moment(a.date).isAfter(moment(b.date));
    });
    this.setState(() => ({
      dateArr: [...newArr]
    }));
  }

  calculateTotalHours() {
    let sumHours = 0;
    let sumMinutes = 0;
    this.state.dateArr.map(item => {
      if (item.hours) {
        sumHours += Number(item.hours);
      }
      if (item.minutes) {
        sumMinutes += Number(item.minutes);
      }
    });
    let totalHours = sumHours + Math.floor(sumMinutes / 60);
    let totalMinutes = sumMinutes % 60;
    console.log(`Hours: ${totalHours} Minutes: ${totalMinutes}`);
    return { totalhours: totalHours, totalMinutes: totalMinutes };
  }

  render() {
    let obj = this.calculateTotalHours();
    return (
      <div>
        <HourlyRate onRateChange={this.handleChange} rate={this.state.rate} />
        <DatePickers
          firstDate={this.state.firstDate}
          secondDate={this.state.secondDate}
          onDateChange={this.handleDateChange}
        />
        <TableLayout
          dateArr={this.state.dateArr}
          adjustArray={this.adjustArray}
        />
        {obj.totalhours > 0 ? (
          <div className="totalPay">
            <p>
              {obj.totalhours + " hours and " + obj.totalMinutes + " minutes"}
            </p>
          </div>
        ) : (
          ""
        )}
        <p>
          Total Pay (before taxes):{" "}
          <strong>
            {(
              obj.totalhours * this.state.rate +
              obj.totalMinutes * (this.state.rate / 60)
            ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </strong>
        </p>
      </div>
    );
  }
}
