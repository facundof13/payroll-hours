import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { tsIndexSignature } from "@babel/types";

export default class TimeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inHour: "",
      inMinute: "",
      inAMorPM: "AM",
      outHour: "",
      outMinute: "",
      outAMorPM: "AM",
      breakStartHour: "",
      breakStartMinute: "",
      breakStartAMorPM: "AM",
      breakEndHour: "",
      breakEndMinute: "",
      breakEndAMorPM: "AM",
      hadBreak: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fixText = this.fixText.bind(this);
  }

  handleChange(e) {
    e.persist();
    if (e.target.name === "hadBreak") {
      this.setState(function() {
        return { [e.target.name]: e.target.checked };
      });
    } else if (e.target.value.length <= 2) {
      this.setState(function() {
        return { [e.target.name]: e.target.value };
      });
    }
  }

  fixText(e) {
    e.persist();
    if (e.target.value.length == 1) {
      this.setState(function() {
        let newNumber = `0${e.target.value}`;
        return { [e.target.name]: newNumber };
      });
    }
  }

  checkIfAllSatisfied() {
    if (
      this.state.inHour !== "" &&
      this.state.inMinute !== "" &&
      this.state.inAMorPM !== "" &&
      this.state.outHour !== "" &&
      this.state.outMinute !== "" &&
      this.state.outAMorPM !== "" &&
      this.state.breakStartHour !== "" &&
      this.state.breakStartMinute !== "" &&
      this.state.breakStartAMorPM !== "" &&
      this.state.breakEndHour !== "" &&
      this.state.breakEndMinute !== "" &&
      this.state.breakEndAMorPM !== ""
    ) {
      return true;
    }
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

    this.findHoursWorked(inDate, outDate, breakStartDate, breakEndDate);

    // console.log(`In time: ${inDate.format("LT")}`);
    // console.log(`Out time: ${outDate.format("LT")}`);
    // console.log(`Break Start time: ${breakStartDate.format("LT")}`);
    // console.log(`Break End time: ${breakEndDate.format("LT")}`);
  }

  findHoursWorked(inDate, outDate, breakStartDate, breakEndDate) {
    let mainHours = outDate.diff(inDate) / 3600000;
    let breakHours = breakEndDate.diff(breakStartDate) / 3600000;
    let totalHours = mainHours - breakHours;
    console.log({
      totalHours: Math.floor(totalHours),
      totalMinutes: (totalHours - Math.floor(totalHours)) * 60
    });
  }

  render() {
    if (this.checkIfAllSatisfied()) {
      this.separateHours();
    }
    return (
      <tr>
        <td>{this.props.date}</td>
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
          <label>Check if no break</label>
          <input
            type="checkbox"
            name="hadBreak"
            onChange={this.handleChange}
          ></input>
        </td>
      </tr>
    );
  }
}
