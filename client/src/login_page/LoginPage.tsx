import "./LoginPage.sass";
import imgUrl from "/assets/github-mark-white.svg";
const clientId = import.meta.env.VITE_CLIENT_ID;
function LoginPage() {
  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  }

  return (
    <div className="login-page-container">
      <button className="login-button" onClick={loginWithGithub}>
        <span>Log in with GitHub</span>
        <img className="gh-logo" src={imgUrl}></img>
      </button>
    </div>
  );
}

export default LoginPage;
