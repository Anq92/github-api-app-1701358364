import "./App.sass";
import LoginPage from "./login_page/LoginPage";
import { useState, useEffect } from "react";
import { UserData } from "./types";
import Dashboard from "./dashboard/Dashboard";

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [userData, setUserData] = useState<UserData>();
  const [codeFromGithub] = useState(codeParam);

  async function getAccessToken(codeParam: string) {
    await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setAccessToken(data.access_token);
          window.location.assign("/");
        }
      });
  }

  const getUserData = async () => {
    await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  };

  useEffect(() => {
    if (codeFromGithub && accessToken === null) {
      getAccessToken(codeFromGithub);
    }
  });

  useEffect(() => {
    if (accessToken && !userData) {
      getUserData();
    }
  });

  function logout() {
    localStorage.removeItem("accessToken");
    setUserData(undefined);
    setAccessToken(null);
  }

  const fetchingToken = <>Fetching authentication token...</>;
  const fetchingData = <>Fetching user data...</>;
  let content = <></>;
  if (codeFromGithub && !accessToken) {
    content = fetchingToken;
  } else if (accessToken && !userData) {
    content = fetchingData;
  } else if (userData) {
    content = <Dashboard userData={userData} />;
  } else {
    content = <LoginPage />;
  }

  return (
    <div className="app-container">
      <header>
        <span>GitHub API App</span>
        {accessToken && (
          <button className="logout-button" onClick={logout}>
            <span>Log out</span>
          </button>
        )}
      </header>
      <main>{content}</main>
      <footer>Developed by Anna Wilczura</footer>
    </div>
  );
}

export default App;
