import React from "react";
import DatePicker from "react-datepicker";

export default class TimeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inHour: "",
      inMinute: "",
      inAMorPM: "",
      outHour: "",
      outMinute: "",
      outAMorPM: "",
      breakStartHour: "",
      breakStartMinute: "",
      breakStartAMorPM: "",
      breakEndHour: "",
      breakEndMinute: "",
      breakEndAMorPM: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.fixText = this.fixText.bind(this);
  }

  handleChange(e) {
    e.persist();
    if (e.target.value.length <= 2) {
      this.setState(function() {
        return { [e.target.name]: e.target.value };
      });
    }
  }

  fixText(e) {
    e.persist();
    console.log(e.target.name, e.target.value);
    if (e.target.value.length == 1) {
      this.setState(function () {
        let newNumber = `0${e.target.value}`
        return { [e.target.name]: newNumber };
      });
    }
  }

  render() {
    console.log(this.state);
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
        </td>
      </tr>
    );
  }
}
