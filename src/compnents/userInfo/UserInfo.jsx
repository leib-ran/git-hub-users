import React from "react";

let usersList = ["leib-ran", "sparco7", "harduf-l", "fareska"];

localStorage.setItem(
  "users",
  JSON.stringify([
    {
      avatar_url: "https://avatars.githubusercontent.com/u/67533862?v=4",
      bio: "Junior Data analyst \r\n\r\n\r\nGraduate BCs Biotechnology Engineering at Ben-Gurion University.",
      blog: "",
      company: null,
      created_at: "2020-06-28T06:03:55Z",
      email: null,
      events_url: "https://api.github.com/users/leib-ran/events{/privacy}",
      followers: 0,
      followers_url: "https://api.github.com/users/leib-ran/followers",
      following: 0,
      following_url:
        "https://api.github.com/users/leib-ran/following{/other_user}",
      gists_url: "https://api.github.com/users/leib-ran/gists{/gist_id}",
      gravatar_id: "",
      hireable: null,
      html_url: "https://github.com/leib-ran",
      id: 67533862,
      location: "Israel",
      login: "leib-ran",
      name: "Ran leibovitz",
      node_id: "MDQ6VXNlcjY3NTMzODYy",
      organizations_url: "https://api.github.com/users/leib-ran/orgs",
      public_gists: 0,
      public_repos: 11,
      received_events_url:
        "https://api.github.com/users/leib-ran/received_events",
      repos_url: "https://api.github.com/users/leib-ran/repos",
      site_admin: false,
      starred_url:
        "https://api.github.com/users/leib-ran/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/leib-ran/subscriptions",
      twitter_username: null,
      type: "User",
      updated_at: "2021-08-10T06:07:22Z",
      url: "https://api.github.com/users/leib-ran",
    },
  ])
);

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
