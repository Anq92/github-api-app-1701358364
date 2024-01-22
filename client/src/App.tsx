import "./App.sass";
import LoginPage from "./login_page/LoginPage";
import { useState, useEffect, useMemo } from "react";
import Dashboard from "./dashboard/Dashboard";
import { LoginService } from "./service/LoginService";

const baseUrl = import.meta.env.BASE_URL;

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [codeFromGithub, setCodeFromGithub] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginService = useMemo(() => {
    return new LoginService();
  }, []);

  useEffect(() => {
    const handleGithubCode = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      codeParam && setCodeFromGithub(codeParam);
    }

    const authorize = async () => {
      const accessToken = await loginService.getAccessToken(codeFromGithub);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        window.location.assign(baseUrl);
      } else {
        setErrorMessage("Authorization failed. Please try later.")
      }
    }

    handleGithubCode();

    if (codeFromGithub && !accessToken) {
      authorize();
    }
  }, [setCodeFromGithub, loginService, codeFromGithub, accessToken]);

  function logout() {
    localStorage.removeItem("accessToken");
    setAccessToken("");
  }

  const fetchingToken = <>Fetching authentication token...</>;
  let content = <></>;

  if (codeFromGithub && !accessToken) {
    content = fetchingToken;
  } else if (accessToken) {
    content = <Dashboard />;
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
      <main>{errorMessage || content}</main>
      <footer>Developed by Anna Wilczura</footer>
    </div>
  );
}

export default App;