import React from "react";

export default class TimeRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>{this.props.date}</p>
      </div>
    )
  }
}
