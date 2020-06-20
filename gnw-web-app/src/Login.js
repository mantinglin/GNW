import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, Redirect } from "react-router-dom";
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': theme.spacing(1),
    width: '25ch',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    height: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Login() {
  const classes = useStyles();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  
  const loginFn = () => {
    fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(res =>  {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then(user => {
      setUser(user);
      setLogin(true);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <div className="header">
        <img src={'./images/logo.png'} alt="Logo" className="logoImg" />
        <h1 className="headerText">GNW</h1>
      </div>
      <div className="mainWrapper">
        <div>
          <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
        </div>
        <div className="signUpContainer">
        <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        {/*Enter User Name*/}
        <TextField
          required
          id="standard-required"
          label="Username"
          style={{ margin: 8 }}
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/*Enter Password*/}
        <TextField
          required
          id="standard-required"
          label="Password"
          type="Password"
          style={{ margin: 8 }}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 8 }}
        startIcon={<CloudUploadIcon />}
        onClick={loginFn}
      >
        Submit
      </Button>
      <Link to="/signUp">Sign Up</Link>
      {login &&
        <Redirect to={{
          pathname: '/chat',
          state: { userInfo: user },
        }} /> }
    </div>
        </div>
      </div>
      <div className="footer">
        <a target="_blank">
          © 2020 COMMUNISTE EN CALIFORNIA. ALL RIGHTS RESERVED.
        </a>
      </div>
    </div>
  );
}
