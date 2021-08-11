import React from "react";

let usersList = ["leib-ran", "sparco7", "harduf-l", "fareska"];

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      users: JSON.parse(localStorage.getItem("users")) || [],
    };
  }

  componentDidUpdate() {
    let prevUserName =
      this.state.users.length == 0
        ? ""
        : this.state.users[this.state.users.length - 1]["login"] || "";
    console.log(prevUserName.toLowerCase());
    if (
      prevUserName.toLowerCase() != this.props.name.toLowerCase() &&
      !this.state.userList[prevUserName]
    ) {
      fetch(`https://api.github.com/users/${this.props.name}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let storage = localStorage.getItem("users");
          let userList = [...this.state.userList];
          let log = res.login || "";
          userList[log] = true;

          if (storage == null) {
            localStorage.setItem("users", JSON.stringify([res]));
            this.setState({ users: [res], userList: userList });
          } else {
            localStorage.setItem(
              "users",
              JSON.stringify(JSON.parse(storage).concat([res]))
            );
            this.setState({
              users: JSON.parse(storage).concat([res]),
              userList: userList,
            });
          }
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.users.map((element, index) => {
          return (
            <div className="ml-10 w-60 p-5 mb-5 h-48 bg-green-300 text-white rounded-2xl transform ">
              <div className="flex">
                <img
                  className="w-32 rounded-full"
                  src={element["avatar_url"]}
                />
                <div>
                  <h1>{element["login"]}</h1>
                  <h2 className="">{element["name"]}</h2>
                  <h3>{element["location"]}</h3>
                </div>
              </div>
              <a href={element["html_url"]} target="_blank" className="text-xs	">
                {element.html_url}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
