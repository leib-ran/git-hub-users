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
      <div className="pt-10">
        <div className="bg-gray-600 rounded-lg opacity-60 text-white w-96 h-40 m-auto pt-5 h-40">
          <Hello></Hello>
          <input className="text-gray-900" type="text" id="search_input" />
          <button onClick={this.getTheUser.bind(this)}>Find</button>
        </div>
        <div>
          <UserInfo name={this.state.name}></UserInfo>
        </div>
      </div>
    );
  }
}
