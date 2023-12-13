import "./LoginPage.sass";

function LoginPage() {
  return (
    <div className="login-page-container">
      <button className="login-button">
        <span>Log in with GitHub</span>
        <img className="gh-logo" src="src/assets/github-mark-white.svg"></img>
      </button>
    </div>
  );
}

export default LoginPage;
