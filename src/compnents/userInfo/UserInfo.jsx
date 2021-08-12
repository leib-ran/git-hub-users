import React from "react";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userList: {},
      users: JSON.parse(localStorage.getItem("users")) || [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("users") == null) {
      let defaultUsers = ["leib-ran"];
      defaultUsers.forEach((element) => {
        this.getApiTostate(element);
      });
    }
  }

  componentDidUpdate() {
    let prevUserName =
      this.state.users.length === 0
        ? ""
        : this.state.users[this.state.users.length - 1]["login"] || "";
    if (
      prevUserName.toLowerCase() !== this.props.name.toLowerCase() &&
      !this.state.userList[this.props.name.toLowerCase()]
    ) {
      this.getApiTostate();
    }
  }

  getApiTostate() {
    let apiName = arguments[0] || this.props.name;
    fetch(`https://api.github.com/users/${apiName}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let storage = localStorage.getItem("users");
        let userList = { ...this.state.userList };
        let log = res.login || this.props.name;
        userList[log.toLowerCase()] = true;

        if (storage == null && res.login) {
          localStorage.setItem("users", JSON.stringify([res]));
          this.setState({ users: [res], userList: userList });
        } else if (res.login) {
          localStorage.setItem(
            "users",
            JSON.stringify(JSON.parse(storage).concat([res]))
          );
          if (res.login) {
            this.setState({
              users: JSON.parse(storage).concat([res]),
              userList: userList,
            });
          } else {
            this.setState({
              userList: userList,
            });
          }
        }
      })
      .catch((err) => {
        let listName = { ...this.state.userList };
        listName[this.props.name.toLowerCase()] = true;
        this.setState({ userList: listName });
      });
  }

  render() {
    return (
      <div className=" mt-10  w-9/12 m-auto">
        <div className="flex m-auto flex-wrap">
          {this.state.users.map((element, index) => {
            return (
              <div className="ml-10 w-96 mb-5 h-48  bg-green-300 text-white rounded-2xl transform overflow-hidden ">
                <div className="flex">
                  <img
                    className="w-32 rounded-full m-2"
                    src={element["avatar_url"]}
                    alt={`${element["login"]}`}
                  />
                  <div className="bg-gray-600 opacity-80 w-80 pr-11 pl-3 ml-2 pt-4 pr-4 text-xs">
                    <h1>{element["login"]}</h1>
                    <h2 className="">{element["name"]}</h2>
                    <h3>{element["location"]}</h3>
                    <p className="pt-5">{element["bio"]}</p>
                  </div>
                </div>
                <a
                  rel="noopener noreferrer"
                  href={element["html_url"]}
                  target="_blank"
                  className="text-xs opacity-80  bg-red-600 w-f pt-2 pb-8 block align-middle pr-4"
                >
                  {element.html_url}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
