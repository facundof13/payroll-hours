import React from "react";
import moment from "moment";

const weekdays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export default class TimeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inHour: "",
      inMinute: "",
      inAMorPM: "AM",
      outHour: "",
      outMinute: "",
      outAMorPM: "PM",
      breakStartHour: "",
      breakStartMinute: "",
      breakStartAMorPM: "PM",
      breakEndHour: "",
      breakEndMinute: "",
      breakEndAMorPM: "PM"
    };
    this.handleChange = this.handleChange.bind(this);
    this.fixText = this.fixText.bind(this);
  }

  handleChange(e) {
    e.persist();
    if (e.target.value.length <= 2) {
      this.setState(
        function() {
          return {
            [e.target.name]: e.target.value
          };
        },
        () => {
          if (this.checkIfAllSatisfied()) {
            this.separateHours();
          }
        }
      );
    }
  }

  fixText(e) {
    e.persist();
    if (e.target.value.length == 1) {
      this.setState(function() {
        let newNumber = `0${e.target.value}`;
        return {
          [e.target.name]: newNumber
        };
      });
    }
  }

  checkIfAllSatisfied() {
    return (
      this.state.inHour !== "" &&
      this.state.inMinute !== "" &&
      this.state.outHour !== "" &&
      this.state.outMinute !== ""
    );
  }

  separateHours() {
    //in times
    let inDate = moment(new Date(this.props.date));
    inDate.hour(this.state.inHour);
    inDate.minute(this.state.inMinute);
    if (this.state.inAMorPM === "PM") {
      inDate.add(12, "hours");
    }

    //out times
    let outDate = moment(new Date(this.props.date));
    outDate.hour(this.state.outHour);
    outDate.minute(this.state.outMinute);
    if (this.state.outAMorPM === "PM") {
      outDate.add(12, "hours");
    }

    console.log(this.state.breakStartMinute !== "" && this.state.breakEndMinute !== "") 
    if (this.state.breakStartMinute !== "" && this.state.breakEndMinute !== "") {
      //break start time
      let breakStartDate = moment(this.props.date);
      breakStartDate.hour(this.state.breakStartHour);
      breakStartDate.minute(this.state.breakStartMinute);
      if (this.state.breakStartAMorPM === "PM") {
        breakStartDate.add(12, "hours");
      }

      //break end time
      let breakEndDate = moment(this.props.date);
      breakEndDate.hour(this.state.breakEndHour);
      breakEndDate.minute(this.state.breakEndMinute);
      if (this.state.breakEndAMorPM === "PM") {
        breakEndDate.add(12, "hours");
      }
      // console.log(`Break Start time: ${breakStartDate.format("LT")}`);
      // console.log(`Break End time: ${breakEndDate.format("LT")}`);
      this.findHoursWorked(inDate, outDate, breakStartDate, breakEndDate);
    } else {
      this.findHoursWorked(inDate, outDate, 0, 0);
    }

    // console.log(`In time: ${inDate.format("LT")}`);
    // console.log(`Out time: ${outDate.format("LT")}`);
  }

  findHoursWorked(inDate, outDate, breakStartDate, breakEndDate) {
    let mainHours = outDate.diff(inDate) / 3600000;
    if (breakStartDate && breakEndDate) {
      let breakHours = breakEndDate.diff(breakStartDate) / 3600000;
      mainHours -= breakHours
    }

    this.props.sendHours({
      date: this.props.date,
      hours: Math.floor(mainHours),
      minutes: Math.floor((mainHours - Math.floor(mainHours)) * 60)
    });
  }

  render() {
    return (
      <tr>
        <td>{weekdays[moment(this.props.date).day()] + ', ' + this.props.date}</td>
        <td>
          <input
            type="text"
            name="inHour"
            placeholder="00"
            value={this.state.inHour}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <span>:</span>
          <input
            type="text"
            name="inMinute"
            placeholder="00"
            value={this.state.inMinute}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <select
            name="inAMorPM"
            value={this.state.inAMorPM}
            onChange={this.handleChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="outHour"
            placeholder="00"
            value={this.state.outHour}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <span>:</span>
          <input
            type="text"
            name="outMinute"
            placeholder="00"
            value={this.state.outMinute}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <select
            name="outAMorPM"
            value={this.state.outAMorPM}
            onChange={this.handleChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="breakStartHour"
            placeholder="00"
            value={this.state.breakStartHour}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <span>:</span>
          <input
            type="text"
            name="breakStartMinute"
            placeholder="00"
            value={this.state.breakStartMinute}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <select
            name="breakStartAMorPM"
            value={this.state.breakStartAMorPM}
            onChange={this.handleChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <input
            type="text"
            name="breakEndHour"
            placeholder="00"
            value={this.state.breakEndHour}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <span>:</span>
          <input
            type="text"
            name="breakEndMinute"
            placeholder="00"
            value={this.state.breakEndMinute}
            onChange={this.handleChange}
            onBlur={this.fixText}
          ></input>
          <select
            name="breakEndAMorPM"
            value={this.state.breakEndAMorPM}
            onChange={this.handleChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </td>
        <td>
          {this.props.hours !== "" ? (
            this.props.hours + ' hours and ' + this.props.minutes + ' minutes'
        ) : ''}
        </td>
      </tr>
    );
  }
}