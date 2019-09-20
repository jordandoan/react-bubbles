import React, { useState } from "react";
import { axiosWithAuth } from '../axiosWithAuth';

const Login = (props) => {
  let [credentials, setCredentials] = useState({username:"", password:""});
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth().post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push("/bubbles");
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        Username (Default Lambda School) <input type="name" name="username" value={credentials.username} onChange={(e) => handleChange(e)} />
        Password (Default i&lt;3Lambd4)<input type="password" name="password" value={credentials.password} onChange={(e) => handleChange(e)} />
        <button>Log in</button>
      </form>

    </>
  );
};

export default Login;
