import './LoginButton.css'

export default function LoginButton(){
    return(<div>
        <a href={`http://localhost:8888/login`}>
          <button id='login-button'>Log in to Spotify to update data</button>
        </a></div>)
}