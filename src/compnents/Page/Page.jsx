import React from "react";
import Hello from "../hello/Hello";
import UserInfo from "../userInfo/UserInfo";

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "leib-ran",
    };
    // this.getTheUser = this.getTheUser.bind(this);
  }

  getTheUser() {
    let inputEl = document.querySelector("#search_input");
    this.setState({ name: inputEl.value });
  }

  render() {
    return (
      <div>
        <Hello name="Ran"></Hello>
        <input type="text" id="search_input" />
        <button onClick={this.getTheUser.bind(this)}>Find</button>
        <UserInfo name={this.state.name}></UserInfo>
      </div>
    );
  }
}
