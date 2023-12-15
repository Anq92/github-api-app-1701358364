import "./LoginPage.sass";

const client_id = "389060375848c3349fc3";

function LoginPage() {
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + client_id
    );
  }

  return (
    <div className="login-page-container">
      <button className="login-button" onClick={loginWithGithub}>
        <span>Log in with GitHub</span>
        <img className="gh-logo" src="src/assets/github-mark-white.svg"></img>
      </button>
    </div>
  );
}

export default LoginPage;
