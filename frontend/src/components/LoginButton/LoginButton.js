import "./LoginButton.css";

export default function LoginButton() {
  return (
    <div>
      <a href={`http://localhost:8888/login`} className="login-button">
        <p>log in to Spotify to update data</p>
      </a>
    </div>
  );
}
